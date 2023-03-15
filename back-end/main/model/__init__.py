#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import pandas
import matplotlib.pyplot as plt
import numpy
dataset = pandas.read_csv(
    '/home/assem/Desktop/.myfiles/myProjects/dietplan/back-end/main/model/diets2.csv')
X = dataset.iloc[:, :-1].values
y = dataset.iloc[:, -1].values
# %%
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, random_state=0)
# %%
# Feature Scaling improve the model performance for Logistic Regression.
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)
# %%
classifier = LogisticRegression()
classifier.fit(X_train, y_train)
# %%
# There are also predict_proba and predict_log_proba methods.
y_predicted = classifier.predict(X_test)
# %%
# numpy.set_printoptions(precision=2)  # Not needed.
print(numpy.concatenate((y_predicted.reshape(len(y_predicted), 1),
                         y_test.reshape(len(y_test), 1)), 1))
# Predict one.
#print(classifier.predict(scaler.transform([[30, 87000]])))
# %%
# Evaluating the model using Confusion matrix.
cm = confusion_matrix(y_test, y_predicted)
print(cm)
accuracy = accuracy_score(y_test, y_predicted)
print('accuracy : '+str(accuracy))
