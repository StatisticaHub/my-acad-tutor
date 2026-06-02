# Lesson 1.2: Prediction vs explanation vs causal thinking

diabetes_data <- read.csv("public/ml-biostatistics/data/shared-diabetes-prediction-data.csv")

# Prediction question:
# Can we predict diabetes status for a new patient?

# Inference question:
# Which variables are associated with diabetes status?

# Causal question:
# Would changing BMI or glucose reduce diabetes risk?

# These are related, but they are not the same question.
# A variable can be useful for prediction without being causal.

model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = diabetes_data,
  family = binomial
)

summary(model)

# Interpretation caution:
# Coefficients show model associations.
# They should not automatically be interpreted as causal effects.
