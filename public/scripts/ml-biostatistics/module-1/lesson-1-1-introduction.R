# Lesson 1.1: What is machine learning in biostatistics?
# Introductory R script for clinical prediction thinking

set.seed(123)

# ------------------------------------------------------------
# 1. Simulate a simple health dataset
# ------------------------------------------------------------

n <- 500

age <- rnorm(n, mean = 55, sd = 12)
bmi <- rnorm(n, mean = 28, sd = 5)
glucose <- rnorm(n, mean = 110, sd = 25)

# True underlying risk mechanism for simulation
linear_predictor <- -8 + 0.04 * age + 0.08 * bmi + 0.03 * glucose
risk <- 1 / (1 + exp(-linear_predictor))

diabetes <- rbinom(n, size = 1, prob = risk)

health_data <- data.frame(
  age = age,
  bmi = bmi,
  glucose = glucose,
  diabetes = diabetes
)

# ------------------------------------------------------------
# 2. Inspect the dataset
# ------------------------------------------------------------

head(health_data)
summary(health_data)
table(health_data$diabetes)

# ------------------------------------------------------------
# 3. Split into training and test data
# ------------------------------------------------------------

train_id <- sample(seq_len(n), size = 0.7 * n)

train_data <- health_data[train_id, ]
test_data <- health_data[-train_id, ]

# ------------------------------------------------------------
# 4. Fit a simple prediction model
# ------------------------------------------------------------

model <- glm(
  diabetes ~ age + bmi + glucose,
  data = train_data,
  family = binomial
)

summary(model)

# ------------------------------------------------------------
# 5. Predict risk in unseen test data
# ------------------------------------------------------------

test_data$predicted_risk <- predict(
  model,
  newdata = test_data,
  type = "response"
)

head(test_data)

# ------------------------------------------------------------
# 6. Convert predicted risk into a class using threshold 0.5
# ------------------------------------------------------------

test_data$predicted_class <- ifelse(test_data$predicted_risk >= 0.5, 1, 0)

confusion_matrix <- table(
  Observed = test_data$diabetes,
  Predicted = test_data$predicted_class
)

confusion_matrix

accuracy <- mean(test_data$diabetes == test_data$predicted_class)
accuracy

# ------------------------------------------------------------
# 7. Interpretation notes
# ------------------------------------------------------------

# This model is a first demonstration only.
# In real medical machine learning, we would also assess:
# - discrimination
# - calibration
# - sensitivity and specificity
# - missing data
# - leakage risk
# - internal validation
# - external validation
# - clinical usefulness
# - transparent reporting

# Important:
# Good prediction does not prove causation.
# A predictor can help estimate risk without being a causal factor.
