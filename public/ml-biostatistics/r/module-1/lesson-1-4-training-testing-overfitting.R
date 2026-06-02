# Lesson 1.4: Training, testing, overfitting and generalisation

set.seed(2026)

diabetes_data <- read.csv("public/ml-biostatistics/data/shared-diabetes-prediction-data.csv")

train_id <- sample(seq_len(nrow(diabetes_data)), size = 0.7 * nrow(diabetes_data))

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

model <- glm(
  diabetes_binary ~ pregnancies + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

train_data$predicted_risk <- predict(model, newdata = train_data, type = "response")
test_data$predicted_risk <- predict(model, newdata = test_data, type = "response")

train_data$predicted_class <- ifelse(train_data$predicted_risk >= 0.5, 1, 0)
test_data$predicted_class <- ifelse(test_data$predicted_risk >= 0.5, 1, 0)

train_accuracy <- mean(train_data$diabetes_binary == train_data$predicted_class)
test_accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

cat("Training accuracy:", round(train_accuracy, 3), "\n")
cat("Test accuracy:", round(test_accuracy, 3), "\n")

cat("\nTest confusion matrix:\n")
print(table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
))
