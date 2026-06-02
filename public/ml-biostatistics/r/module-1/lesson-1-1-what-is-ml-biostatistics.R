# Lesson 1.1: What is Machine Learning in Biostatistics?
# Introductory script for the shared diabetes prediction workflow.
#
# Aim:
# This script introduces machine learning as prediction modelling.
# It uses the shared diabetes dataset that will appear throughout the course.

# Required packages:
# install.packages(c("dplyr", "readr", "ggplot2"))

library(dplyr)
library(readr)
library(ggplot2)

set.seed(2026)

# ------------------------------------------------------------
# 1. Load shared course dataset
# ------------------------------------------------------------

diabetes_data <- read_csv(
  "public/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  show_col_types = FALSE
)

cat("\n============================================================\n")
cat("LESSON 1.1: WHAT IS MACHINE LEARNING IN BIOSTATISTICS?\n")
cat("============================================================\n\n")

cat("Dataset loaded successfully.\n")
cat("Rows:", nrow(diabetes_data), "\n")
cat("Columns:", ncol(diabetes_data), "\n\n")

cat("Column names:\n")
print(names(diabetes_data))

cat("\nFirst six rows:\n")
print(head(diabetes_data))

# ------------------------------------------------------------
# 2. Define the prediction question
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PREDICTION QUESTION\n")
cat("------------------------------------------------------------\n\n")

cat("Can routinely measured clinical characteristics help predict diabetes status?\n\n")

cat("Outcome variable:\n")
cat("- diabetes: neg or pos\n")
cat("- diabetes_binary: 0 for negative, 1 for positive\n\n")

cat("Candidate predictors:\n")
cat("- pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age\n\n")

# ------------------------------------------------------------
# 3. Outcome distribution
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("OUTCOME DISTRIBUTION\n")
cat("------------------------------------------------------------\n\n")

outcome_table <- table(diabetes_data$diabetes)
print(outcome_table)

outcome_percent <- prop.table(outcome_table)
cat("\nOutcome percentages:\n")
print(round(100 * outcome_percent, 1))

cat("\nInterpretation:\n")
cat("The dataset has more diabetes-negative than diabetes-positive patients.\n")
cat("This means accuracy alone may be misleading in later modelling.\n\n")

# ------------------------------------------------------------
# 4. Basic predictor summaries
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("BASIC PREDICTOR SUMMARIES\n")
cat("------------------------------------------------------------\n\n")

selected_summary <- diabetes_data %>%
  summarise(
    mean_glucose = mean(glucose, na.rm = TRUE),
    median_glucose = median(glucose, na.rm = TRUE),
    mean_bmi = mean(mass, na.rm = TRUE),
    median_bmi = median(mass, na.rm = TRUE),
    mean_age = mean(age, na.rm = TRUE),
    median_age = median(age, na.rm = TRUE)
  )

print(selected_summary)

cat("\nPredictor means by diabetes status:\n")

group_summary <- diabetes_data %>%
  group_by(diabetes) %>%
  summarise(
    n = n(),
    mean_glucose = mean(glucose, na.rm = TRUE),
    mean_bmi = mean(mass, na.rm = TRUE),
    mean_age = mean(age, na.rm = TRUE),
    .groups = "drop"
  )

print(group_summary)

cat("\nInterpretation:\n")
cat("The diabetes-positive group tends to have higher average glucose and BMI.\n")
cat("This suggests these variables may help prediction, but this is not a causal claim.\n\n")

# ------------------------------------------------------------
# 5. Create a simple training/test split
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("TRAINING AND TESTING IDEA\n")
cat("------------------------------------------------------------\n\n")

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = 0.7 * nrow(diabetes_data)
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

cat("Training rows:", nrow(train_data), "\n")
cat("Test rows:", nrow(test_data), "\n\n")

cat("Interpretation:\n")
cat("The model learns from the training data.\n")
cat("We evaluate it on the test data to ask whether it generalises to unseen patients.\n\n")

# ------------------------------------------------------------
# 6. Fit a simple first prediction model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("FIRST SIMPLE PREDICTION MODEL\n")
cat("------------------------------------------------------------\n\n")

simple_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

cat("Simple logistic regression model fitted.\n")
cat("Predictors used: glucose, BMI/mass, age\n\n")

cat("Model coefficient summary:\n")
print(summary(simple_model)$coefficients)

cat("\nImportant interpretation:\n")
cat("These coefficients describe associations inside a prediction model.\n")
cat("They should not automatically be interpreted as causal effects.\n\n")

# ------------------------------------------------------------
# 7. Predict risk in unseen test data
# ------------------------------------------------------------

test_data <- test_data %>%
  mutate(
    predicted_risk = predict(simple_model, newdata = test_data, type = "response"),
    predicted_class = ifelse(predicted_risk >= 0.5, 1, 0)
  )

cat("\n------------------------------------------------------------\n")
cat("PREDICTED RISKS IN TEST DATA\n")
cat("------------------------------------------------------------\n\n")

cat("First ten predicted risks:\n")
print(
  test_data %>%
    select(diabetes, diabetes_binary, glucose, mass, age, predicted_risk, predicted_class) %>%
    head(10)
)

# ------------------------------------------------------------
# 8. First simple performance check
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("FIRST PERFORMANCE CHECK AT THRESHOLD 0.50\n")
cat("------------------------------------------------------------\n\n")

confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

print(confusion_matrix)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tn <- confusion_matrix["0", "0"]
fp <- confusion_matrix["0", "1"]
fn <- confusion_matrix["1", "0"]
tp <- confusion_matrix["1", "1"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("\nAccuracy:", round(accuracy, 3), "\n")
cat("Sensitivity:", round(sensitivity, 3), "\n")
cat("Specificity:", round(specificity, 3), "\n\n")

cat("Interpretation:\n")
cat("Accuracy gives an overall summary, but it does not tell the full clinical story.\n")
cat("Sensitivity tells us how many diabetes-positive patients were detected.\n")
cat("Specificity tells us how many diabetes-negative patients were correctly identified.\n")
cat("Later lessons will study these metrics more carefully.\n\n")

# ------------------------------------------------------------
# 9. Save simple figures for the lesson page
# ------------------------------------------------------------

dir.create(
  "public/ml-biostatistics/figures/module-1",
  recursive = TRUE,
  showWarnings = FALSE
)

# Figure 1: outcome distribution
p1 <- ggplot(diabetes_data, aes(x = diabetes)) +
  geom_bar(fill = "steelblue") +
  labs(
    title = "Diabetes outcome distribution",
    subtitle = "The outcome is imbalanced: diabetes-negative patients are more common.",
    x = "Diabetes status",
    y = "Number of patients"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-1-outcome-distribution.png",
  p1,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 2: glucose by diabetes status
p2 <- ggplot(diabetes_data, aes(x = diabetes, y = glucose)) +
  geom_boxplot(fill = "grey90", colour = "grey30") +
  labs(
    title = "Glucose values by diabetes status",
    subtitle = "Higher glucose values tend to appear in the diabetes-positive group.",
    x = "Diabetes status",
    y = "Glucose"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-1-glucose-by-diabetes.png",
  p2,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 3: predicted risk distribution
p3 <- ggplot(test_data, aes(x = predicted_risk, fill = diabetes)) +
  geom_histogram(position = "identity", alpha = 0.6, bins = 25) +
  labs(
    title = "Predicted diabetes risk in the test set",
    subtitle = "The model gives each test patient a predicted probability.",
    x = "Predicted risk",
    y = "Number of patients",
    fill = "Observed diabetes"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-1-predicted-risk-distribution.png",
  p3,
  width = 8,
  height = 5,
  dpi = 300
)

cat("\n------------------------------------------------------------\n")
cat("FIGURES SAVED\n")
cat("------------------------------------------------------------\n\n")

cat("Saved:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-1-outcome-distribution.png\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-1-glucose-by-diabetes.png\n")
cat("3. public/ml-biostatistics/figures/module-1/lesson-1-1-predicted-risk-distribution.png\n\n")

# ------------------------------------------------------------
# 10. Final lesson message
# ------------------------------------------------------------

cat("============================================================\n")
cat("LESSON 1.1 COMPLETE\n")
cat("============================================================\n\n")

cat("Big idea:\n")
cat("Machine learning in biostatistics is not just algorithm fitting.\n")
cat("It is the process of defining a medical prediction question,\n")
cat("learning patterns from data, testing the model on unseen patients,\n")
cat("and interpreting predictions carefully in clinical context.\n\n")
