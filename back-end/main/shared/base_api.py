import http
from functools import wraps

from flask import request, url_for, jsonify
from marshmallow import INCLUDE
from webargs import fields
from webargs.flaskparser import parser

from main.shared.base_view import BaseView

DEFAULT_PAGE = 1
DEFAULT_PER_PAGE = 50
DEFAULT_MAX_PER_PAGE = 50


def decorate_methods(decorator, methods):
    def wrapper(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            if f.__name__ in methods:
                decorated = decorator(f)
                return decorated(*args, **kwargs)
            else:
                return f(*args, **kwargs)

        return wrapped

    return wrapper


class BaseAPI(BaseView):
    model = None
    schema = None

    default_page = DEFAULT_PAGE
    default_per_page = DEFAULT_PER_PAGE
    default_max_per_page = DEFAULT_MAX_PER_PAGE

    parser_args_location = 'query'
    url_for_params = {
        '_external': True
    }

    @property
    def default_args(self):
        return {
            'page': fields.Int(missing=self.default_page, validate=lambda val: val > 0),
            'per_page': fields.Int(missing=self.default_per_page,
                                   validate=lambda val: 0 < val <= self.default_max_per_page)
        }

    def _query(self):
        return self.model.query

    def _filtered_query(self):
        return self._query(), self._parse_args(self.default_args)

    def _parse_args(self, args):
        return parser.parse(args, request, location=self.parser_args_location)

    def _url_for(self, **kwargs):
        return url_for(request.endpoint,
                       **self.url_for_params, **kwargs)

    def _paginate(self, query, page, per_page, **kwargs):
        _query = query.paginate(page, per_page, False)

        meta = {
            'page': page,
            'pages': _query.pages,
            'per_page': per_page,
            'total': _query.total
        }

        links = {
            'self': self._url_for(page=page, per_page=per_page, **kwargs),
            'first': self._url_for(page=1, per_page=per_page, **kwargs),
            'last': self._url_for(page=_query.pages, per_page=per_page, **kwargs)
        }

        if _query.has_prev:
            links['prev'] = self._url_for(
                page=_query.prev_num, per_page=per_page, **kwargs)

        if _query.has_next:
            links['next'] = self._url_for(
                page=_query.next_num, per_page=per_page, **kwargs)

        return _query, meta, links

    def _get_paginated_elements_by_args(self, query, parsed_args):
        query, meta, links = self._paginate(query=query, **parsed_args)
        elements = query.items

        return elements, meta, links

    def _process_request(self, partial=False):
        form_data = (request.json or (request.form.to_dict()
                     if request.form else None)) or {}
        serializer = self.schema(unknown=INCLUDE)
        errors = serializer.validate(form_data, partial=partial)

        return form_data, errors

    def index(self):
        query, args = self._filtered_query()
        elements, meta, links = self._get_paginated_elements_by_args(
            query, args)

        serializer = self.schema(many=True)

        return jsonify({
            '_meta': meta,
            'data': serializer.dump(elements),
            '_links': links
        }), http.HTTPStatus.OK

    def get(self, element_id):
        element = self._query().filter(self.model.id == element_id).first()
        if not element:
            return jsonify({}), http.HTTPStatus.NOT_FOUND

        serializer = self.schema()

        return jsonify(serializer.dump(element)), http.HTTPStatus.OK

    def post(self):
        form_data, errors = self._process_request()
        if errors:
            return jsonify({
                'errors': errors
            }), http.HTTPStatus.BAD_REQUEST

        element = self.model(form_data=form_data, commit=True)
        serializer = self.schema()

        return jsonify(serializer.dump(element)), http.HTTPStatus.CREATED

    def patch(self, element_id):
        element = self._query().filter(self.model.id == element_id).first()
        if not element:
            return jsonify({}), http.HTTPStatus.NOT_FOUND

        form_data, errors = self._process_request(partial=True)
        if errors:
            return jsonify({
                'errors': errors
            }), http.HTTPStatus.BAD_REQUEST

        element.update(form_data=form_data, commit=True)
        serializer = self.schema()

        return jsonify(serializer.dump(element)), http.HTTPStatus.OK

    def delete(self, element_id):
        element = self._query().filter(self.model.id == element_id).first()
        if not element:
            return jsonify({}), http.HTTPStatus.NOT_FOUND

        element.destroy(commit=True)

        return '', http.HTTPStatus.NO_CONTENT
