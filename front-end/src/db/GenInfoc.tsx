const types = [
  [
    "Type 1 diabetes (previously known as diabetes Insulin-dependent or juvenile diabetes) is characterized by insufficient insulin production, i.e. the body can no longer produce the insulin it needs and blood sugar levels become very high. This is because the body's immune system mistakenly attacks healthy cells in the pancreas responsible for producing insulin. The disease can affect people of any age, but it usually occurs in children or young adults. A person with type 1 diabetes can quickly develop a condition called diabetic ketoacidosis, which can be fatal if not treated quickly and properly, but with daily insulin therapy and a healthy diet they can live normally. .",
    "Type 2 diabetes (formerly called non-insulin-dependent or adult diabetes) usually affects people over the age of 40, although it is becoming more common in younger people. This type of diabetes occurs when the body stops producing sufficient amounts of insulin or when the body does not use insulin properly (this is called insulin resistance). It can also be caused by a combination of the two. The essential treatment for type 2 diabetes includes eating a healthy diet, getting good physical activity.",
  ],
];
const content = [
  {
    definition:
      'Diabetes is a chronic disease that occurs when the pancreas does not produce enough insulin or when the body is unable to use the insulin it produces effectively. This results in an increased concentration of glucose in the blood "hyperglycemia".',
    types: types[0],
    symptoms: [
      "Type 1 diabetes often develops suddenly and, depending on the individual, can cause the following symptoms: Abnormal thirst and dry mouth, Frequent urination (urination), Nighttime incontinence, Lack of energy and extreme fatigue, Constant hunger, Sudden weight loss and Blurred vision.",
      "Symptoms of type 2 diabetes include: Very frequent urination (urine), Excessive thirst, Extreme hunger, Blurred vision, Lack of energy and extreme fatigue, Numbness and tingling in the hands and feet, Slow healing of wounds and recurrent infections.",
    ],
  },
  {
    definition:
      "High blood pressure is a pathological increase in blood pressure. It is defined as a systolic pressure “PAS” (when the heart is pumping) equal to or greater than 140 mmHg and / or a diastolic pressure “PAD” (when the heart relaxes) equal to or greater than 90mmHg.\
    This definition includes certain reservations which relate primarily to certain physiological or pathological situations:\
- during pregnancy: we speak of hypertension when the SBP ≥ 120mmHg and / or the DBP ≥ 80mmHg.\
- during diabetes, and renal failure, hypertension is defined as blood pressure greater than 130 / 80mmHg.",
    types: undefined,
    symptoms: [
      "En général, l'hypertension artérielle ne donne aucun symptôme susceptible d'alerter le patient (elle est asymptomatique). Parfois, cependant, certains signes font suspecter une hypertension artérielle : Des  maux de tête le matin sur le sommet ou derrière la tête , des vertiges ou des bourdonnements d'oreilles ,des palpitations ,une fatigue , des saignements de nez, de la confusion ou de la somnolence , des engourdissements ou des fourmillements dans les pieds et les mains et des hémorragies conjonctivales .",
    ],
  },
];

export const GenInfoc = [
  {
    id: 0,
    img: "/assets/Diabetes-2.webp",
    sub: "to know",
    title: "Diabetes",
    content: content[0],
  },
  {
    id: 1,
    img: "/assets/hypertension.jpg",
    sub: "to know",
    title: "Hypertension",
    content: content[1],
  },
];
