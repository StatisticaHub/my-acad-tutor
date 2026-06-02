# Lesson 1.5: Biostatistical Workflow for ML Projects
# Machine Learning in Biostatistics
#
# Aim:
# This script brings Module 1 together into a complete responsible
# medical machine learning workflow.
#
# The workflow:
# 1. Define the clinical prediction question
# 2. Define the target population
# 3. Define the outcome and prediction time
# 4. Check candidate predictors and leakage risk
# 5. Split data into training and test sets
# 6. Fit a prediction model
# 7. Validate performance on unseen patients
# 8. Examine threshold trade-offs
# 9. Summarise clinical usefulness and limitations
# 10. Produce a reporting-ready workflow summary
#
# Shared course dataset:
# public/ml-biostatistics/data/shared-diabetes-prediction-data.csv
#
# Required packages:
# install.packages(c("dplyr", "readr", "ggplot2", "pROC"))

library(dplyr)
library(readr)
library(ggplot2)
library(pROC)

set.seed(2026)

# ------------------------------------------------------------
# 1. Load shared course dataset
# ------------------------------------------------------------

diabetes_data <- read_csv(
  "public/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  show_col_types = FALSE
)

cat("\n============================================================\n")
cat("LESSON 1.5: BIOSTATISTICAL WORKFLOW FOR ML PROJECTS\n")
cat("============================================================\n\n")

cat("Dataset loaded successfully.\n")
cat("Rows:", nrow(diabetes_data), "\n")
cat("Columns:", ncol(diabetes_data), "\n\n")

cat("Variables available:\n")
print(names(diabetes_data))

cat("\nOutcome variable:\n")
cat("- diabetes: neg or pos\n")
cat("- diabetes_binary: 0 for negative, 1 for positive\n\n")

# ------------------------------------------------------------
# 2. Define the clinical prediction question
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 1: DEFINE THE CLINICAL PREDICTION QUESTION\n")
cat("------------------------------------------------------------\n\n")

clinical_question <- "Can routinely measured clinical characteristics predict diabetes status?"

cat("Clinical prediction question:\n")
cat(clinical_question, "\n\n")

cat("Target population:\n")
cat("Patients with routinely measured clinical characteristics relevant to diabetes risk.\n\n")

cat("Prediction time:\n")
cat("At the point when glucose, BMI/mass, age and related clinical measurements are available.\n\n")

cat("Outcome:\n")
cat("Diabetes status, coded as negative or positive.\n\n")

cat("Intended use:\n")
cat("Educational demonstration of a diabetes risk prediction workflow.\n")
cat("This is not a deployable clinical model.\n\n")

# ------------------------------------------------------------
# 3. Check data structure and outcome balance
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 2: CHECK DATA STRUCTURE AND OUTCOME BALANCE\n")
cat("------------------------------------------------------------\n\n")

analysis_data <- diabetes_data %>%
  select(
    diabetes,
    diabetes_binary,
    pregnant,
    glucose,
    pressure,
    triceps,
    insulin,
    mass,
    pedigree,
    age
  ) %>%
  na.omit()

cat("Rows after selecting analysis variables:", nrow(analysis_data), "\n")
cat("Columns in analysis dataset:", ncol(analysis_data), "\n\n")

outcome_table <- table(analysis_data$diabetes)
outcome_percent <- round(100 * prop.table(outcome_table), 1)

cat("Outcome distribution:\n")
print(outcome_table)

cat("\nOutcome percentages:\n")
print(outcome_percent)

cat("\nInterpretation:\n")
cat("The dataset has more diabetes-negative than diabetes-positive patients.\n")
cat("Therefore, accuracy alone is not enough. We should also report sensitivity,\n")
cat("specificity, AUC, Brier score and threshold-based interpretation.\n\n")

# ------------------------------------------------------------
# 4. Predictor availability and leakage screening
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 3: CHECK PREDICTORS AND LEAKAGE RISK\n")
cat("------------------------------------------------------------\n\n")

predictor_checklist <- data.frame(
  predictor = c(
    "pregnant",
    "glucose",
    "pressure",
    "triceps",
    "insulin",
    "mass",
    "pedigree",
    "age"
  ),
  clinical_meaning = c(
    "Number of pregnancies",
    "Plasma glucose measurement",
    "Blood pressure measurement",
    "Skinfold thickness measurement",
    "Insulin measurement",
    "BMI-like body mass measure",
    "Diabetes pedigree function",
    "Age"
  ),
  available_at_prediction_time = c(
    "Likely yes",
    "Likely yes",
    "Likely yes",
    "Likely yes",
    "Likely yes",
    "Likely yes",
    "Likely yes",
    "Likely yes"
  ),
  leakage_risk = c(
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low if measured before outcome",
    "Low"
  )
)

print(predictor_checklist)

cat("\nInterpretation:\n")
cat("A predictor is only valid if it would be available at the real prediction time.\n")
cat("Variables measured after diagnosis, after treatment or after follow-up would create leakage.\n\n")

# ------------------------------------------------------------
# 5. Train/test split
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 4: CREATE TRAINING AND TEST DATA\n")
cat("------------------------------------------------------------\n\n")

train_id <- sample(
  seq_len(nrow(analysis_data)),
  size = 0.7 * nrow(analysis_data)
)

train_data <- analysis_data[train_id, ]
test_data <- analysis_data[-train_id, ]

cat("Training rows:", nrow(train_data), "\n")
cat("Test rows:", nrow(test_data), "\n\n")

cat("Training outcome distribution:\n")
print(table(train_data$diabetes))

cat("\nTest outcome distribution:\n")
print(table(test_data$diabetes))

cat("\nInterpretation:\n")
cat("The model learns from the training data.\n")
cat("The test data are used only after model fitting, to estimate performance on unseen patients.\n\n")

# ------------------------------------------------------------
# 6. Fit a prediction model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 5: FIT A PREDICTION MODEL\n")
cat("------------------------------------------------------------\n\n")

workflow_model <- glm(
  diabetes_binary ~ pregnant + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

cat("Model fitted:\n")
cat("Logistic regression using all available clinical predictors.\n\n")

cat("Model coefficient summary:\n")
print(round(summary(workflow_model)$coefficients, 4))

cat("\nInterpretation caution:\n")
cat("The model is used for prediction. Coefficients describe model associations,\n")
cat("not automatically causal effects.\n\n")

# ------------------------------------------------------------
# 7. Predict risk in test data
# ------------------------------------------------------------

test_data <- test_data %>%
  mutate(
    predicted_risk = predict(workflow_model, newdata = test_data, type = "response")
  )

cat("\n------------------------------------------------------------\n")
cat("STEP 6: PREDICT RISK IN UNSEEN TEST PATIENTS\n")
cat("------------------------------------------------------------\n\n")

cat("First ten predicted risks:\n")
print(
  test_data %>%
    select(diabetes, diabetes_binary, predicted_risk) %>%
    head(10)
)

cat("\nPredicted risk summary:\n")
print(summary(test_data$predicted_risk))

cat("\nInterpretation:\n")
cat("Each test patient receives a predicted probability of diabetes.\n")
cat("A predicted probability is not a diagnosis by itself.\n")
cat("A threshold is needed if we want to classify patients into risk groups.\n\n")

# ------------------------------------------------------------
# 8. Performance helper function
# ------------------------------------------------------------

calculate_threshold_metrics <- function(data, threshold) {
  predicted_class <- ifelse(data$predicted_risk >= threshold, 1, 0)

  observed <- factor(data$diabetes_binary, levels = c(0, 1))
  predicted <- factor(predicted_class, levels = c(0, 1))

  cm <- table(Observed = observed, Predicted = predicted)

  tn <- cm["0", "0"]
  fp <- cm["0", "1"]
  fn <- cm["1", "0"]
  tp <- cm["1", "1"]

  accuracy <- (tp + tn) / sum(cm)
  sensitivity <- tp / (tp + fn)
  specificity <- tn / (tn + fp)
  ppv <- tp / (tp + fp)
  npv <- tn / (tn + fn)

  data.frame(
    threshold = threshold,
    accuracy = as.numeric(accuracy),
    sensitivity = as.numeric(sensitivity),
    specificity = as.numeric(specificity),
    ppv = as.numeric(ppv),
    npv = as.numeric(npv),
    true_positive = as.numeric(tp),
    false_positive = as.numeric(fp),
    true_negative = as.numeric(tn),
    false_negative = as.numeric(fn)
  )
}

# ------------------------------------------------------------
# 9. Evaluate model at threshold 0.50
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 7: EVALUATE MODEL PERFORMANCE AT THRESHOLD 0.50\n")
cat("------------------------------------------------------------\n\n")

test_data <- test_data %>%
  mutate(
    predicted_class_050 = ifelse(predicted_risk >= 0.5, 1, 0)
  )

confusion_matrix_050 <- table(
  Observed = factor(test_data$diabetes_binary, levels = c(0, 1)),
  Predicted = factor(test_data$predicted_class_050, levels = c(0, 1))
)

metrics_050 <- calculate_threshold_metrics(test_data, threshold = 0.50)

roc_obj <- roc(
  response = test_data$diabetes_binary,
  predictor = test_data$predicted_risk,
  quiet = TRUE
)

auc_value <- as.numeric(auc(roc_obj))
brier_score <- mean((test_data$diabetes_binary - test_data$predicted_risk)^2)

cat("Confusion matrix at threshold 0.50:\n")
print(confusion_matrix_050)

cat("\nPerformance at threshold 0.50:\n")
print(round(metrics_050, 3))

cat("\nAUC:", round(auc_value, 3), "\n")
cat("Brier score:", round(brier_score, 3), "\n\n")

cat("Interpretation:\n")
cat("The threshold controls the trade-off between detecting diabetes-positive patients\n")
cat("and avoiding false positives among diabetes-negative patients.\n")
cat("AUC summarises ranking ability across thresholds.\n")
cat("The Brier score summarises the average squared difference between observed outcomes and predicted risks.\n\n")

# ------------------------------------------------------------
# 10. Threshold trade-off lab
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 8: THRESHOLD TRADE-OFF LAB\n")
cat("------------------------------------------------------------\n\n")

thresholds <- c(0.20, 0.30, 0.40, 0.50, 0.60, 0.70)

threshold_table <- bind_rows(
  lapply(thresholds, function(x) calculate_threshold_metrics(test_data, x))
)

cat("Threshold performance table:\n")
print(
  threshold_table %>%
    mutate(across(where(is.numeric), ~ round(.x, 3)))
)

cat("\nInterpretation:\n")
cat("Lower thresholds usually increase sensitivity but reduce specificity.\n")
cat("Higher thresholds usually increase specificity but reduce sensitivity.\n")
cat("The best threshold depends on clinical context and consequences of false positives and false negatives.\n\n")

# ------------------------------------------------------------
# 11. Clinical usefulness questions
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 9: CLINICAL USEFULNESS QUESTIONS\n")
cat("------------------------------------------------------------\n\n")

clinical_questions <- data.frame(
  question = c(
    "Who will use the prediction?",
    "When will the prediction be made?",
    "What action follows a high-risk prediction?",
    "What is the harm of a false positive?",
    "What is the harm of a false negative?",
    "Does the model work in new settings?",
    "Is the model calibrated?",
    "Can the model be reported transparently?"
  ),
  why_it_matters = c(
    "The user determines the decision context.",
    "Predictors must be available at that time.",
    "A prediction is useful only if it can support action.",
    "False alarms may cause anxiety, cost or unnecessary intervention.",
    "Missed high-risk patients may lose the chance for monitoring or prevention.",
    "Internal performance may not generalise externally.",
    "Predicted probabilities should match observed risks.",
    "Transparent reporting supports reproducibility and trust."
  )
)

print(clinical_questions)

cat("\nInterpretation:\n")
cat("Good performance metrics are not enough.\n")
cat("A medical ML project also needs a clear decision context, leakage checks,\n")
cat("calibration assessment, external validation and transparent reporting.\n\n")

# ------------------------------------------------------------
# 12. Reporting-ready summary
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("STEP 10: REPORTING-READY SUMMARY\n")
cat("------------------------------------------------------------\n\n")

summary_table <- data.frame(
  item = c(
    "Clinical question",
    "Target population",
    "Outcome",
    "Prediction time",
    "Predictors",
    "Training rows",
    "Test rows",
    "Model",
    "AUC",
    "Brier score",
    "Threshold 0.50 accuracy",
    "Threshold 0.50 sensitivity",
    "Threshold 0.50 specificity",
    "Main limitation"
  ),
  value = c(
    clinical_question,
    "Patients with routinely measured diabetes-related clinical characteristics",
    "Diabetes status",
    "When candidate predictors are available before outcome interpretation",
    "pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age",
    as.character(nrow(train_data)),
    as.character(nrow(test_data)),
    "Logistic regression",
    as.character(round(auc_value, 3)),
    as.character(round(brier_score, 3)),
    as.character(round(metrics_050$accuracy, 3)),
    as.character(round(metrics_050$sensitivity, 3)),
    as.character(round(metrics_050$specificity, 3)),
    "Internal train/test split only; external validation would be needed"
  )
)

print(summary_table)

cat("\nReport paragraph:\n")
cat("A logistic diabetes prediction model was fitted using routinely measured clinical predictors.\n")
cat("The data were split into training and test sets, with the model fitted only on the training data.\n")
cat("Performance was evaluated on the held-out test set using discrimination, calibration-related error,\n")
cat("and threshold-based classification metrics. The model should be interpreted as an educational\n")
cat("prediction workflow, not as a deployable clinical tool.\n\n")

# ------------------------------------------------------------
# 13. Save figures for Lesson 1.5
# ------------------------------------------------------------

dir.create(
  "public/ml-biostatistics/figures/module-1",
  recursive = TRUE,
  showWarnings = FALSE
)

# Figure 1: Workflow roadmap
workflow_steps <- data.frame(
  step = factor(
    c(
      "Question",
      "Population",
      "Outcome",
      "Predictors",
      "Split",
      "Model",
      "Validate",
      "Threshold",
      "Report"
    ),
    levels = c(
      "Question",
      "Population",
      "Outcome",
      "Predictors",
      "Split",
      "Model",
      "Validate",
      "Threshold",
      "Report"
    )
  ),
  order = 1:9,
  description = c(
    "Define clinical question",
    "Define target patients",
    "Define outcome window",
    "Check timing and leakage",
    "Train/test separation",
    "Fit prediction model",
    "Evaluate unseen data",
    "Choose decision threshold",
    "Report limitations"
  )
)

p1 <- ggplot(workflow_steps, aes(x = order, y = 1)) +
  geom_line(linewidth = 1, colour = "grey40") +
  geom_point(size = 6, colour = "steelblue") +
  geom_text(aes(label = step), vjust = -1.1, size = 4) +
  geom_text(aes(label = description), vjust = 2.2, size = 3.2) +
  scale_x_continuous(breaks = 1:9) +
  ylim(0.4, 1.7) +
  labs(
    title = "Biostatistical machine learning workflow",
    subtitle = "A responsible ML project begins before model fitting and continues through validation and reporting.",
    x = "Workflow order",
    y = ""
  ) +
  theme_minimal(base_size = 14) +
  theme(
    axis.text.y = element_blank(),
    axis.ticks.y = element_blank(),
    panel.grid.major.y = element_blank(),
    panel.grid.minor = element_blank()
  )

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-5-workflow-roadmap.png",
  p1,
  width = 11,
  height = 5,
  dpi = 300
)

# Figure 2: Predicted risk distribution
p2 <- ggplot(test_data, aes(x = predicted_risk, fill = diabetes)) +
  geom_histogram(position = "identity", alpha = 0.55, bins = 25) +
  labs(
    title = "Predicted diabetes risk in the test data",
    subtitle = "Predicted probabilities must be interpreted with validation and clinical context.",
    x = "Predicted diabetes risk",
    y = "Number of patients",
    fill = "Observed diabetes"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-5-predicted-risk-distribution.png",
  p2,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 3: Threshold trade-off
threshold_long <- bind_rows(
  threshold_table %>%
    transmute(threshold, metric = "Sensitivity", value = sensitivity),
  threshold_table %>%
    transmute(threshold, metric = "Specificity", value = specificity),
  threshold_table %>%
    transmute(threshold, metric = "Accuracy", value = accuracy)
)

p3 <- ggplot(threshold_long, aes(x = threshold, y = value, colour = metric)) +
  geom_line(linewidth = 1.1) +
  geom_point(size = 3) +
  coord_cartesian(ylim = c(0, 1)) +
  labs(
    title = "Threshold trade-off",
    subtitle = "Changing the threshold changes sensitivity, specificity and accuracy.",
    x = "Classification threshold",
    y = "Metric value",
    colour = "Metric"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-5-threshold-tradeoff.png",
  p3,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 4: Predictor timing and leakage checklist
predictor_plot_data <- predictor_checklist %>%
  mutate(
    predictor = factor(predictor, levels = rev(predictor)),
    status = ifelse(available_at_prediction_time == "Likely yes", "Available before prediction", "Check")
  )

p4 <- ggplot(predictor_plot_data, aes(x = status, y = predictor)) +
  geom_point(size = 5, colour = "steelblue") +
  labs(
    title = "Predictor timing checklist",
    subtitle = "Predictors must be available at the real prediction time.",
    x = "Timing status",
    y = "Predictor"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-5-predictor-timing-checklist.png",
  p4,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 5: Reporting dashboard
dashboard_data <- data.frame(
  metric = c("AUC", "Accuracy", "Sensitivity", "Specificity"),
  value = c(
    auc_value,
    metrics_050$accuracy,
    metrics_050$sensitivity,
    metrics_050$specificity
  )
)

p5 <- ggplot(dashboard_data, aes(x = metric, y = value)) +
  geom_col(fill = "steelblue") +
  coord_cartesian(ylim = c(0, 1)) +
  labs(
    title = "Reporting dashboard at threshold 0.50",
    subtitle = "Report multiple metrics rather than accuracy alone.",
    x = "Metric",
    y = "Value"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-5-reporting-dashboard.png",
  p5,
  width = 8,
  height = 5,
  dpi = 300
)

# Save tables for optional later use
write_csv(
  threshold_table,
  "public/ml-biostatistics/figures/module-1/lesson-1-5-threshold-table.csv"
)

write_csv(
  summary_table,
  "public/ml-biostatistics/figures/module-1/lesson-1-5-reporting-summary.csv"
)

cat("\n------------------------------------------------------------\n")
cat("FIGURES AND TABLES SAVED\n")
cat("------------------------------------------------------------\n\n")

cat("Saved figures:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-5-workflow-roadmap.png\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-5-predicted-risk-distribution.png\n")
cat("3. public/ml-biostatistics/figures/module-1/lesson-1-5-threshold-tradeoff.png\n")
cat("4. public/ml-biostatistics/figures/module-1/lesson-1-5-predictor-timing-checklist.png\n")
cat("5. public/ml-biostatistics/figures/module-1/lesson-1-5-reporting-dashboard.png\n\n")

cat("Saved tables:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-5-threshold-table.csv\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-5-reporting-summary.csv\n\n")

# ------------------------------------------------------------
# 14. Final lesson message
# ------------------------------------------------------------

cat("============================================================\n")
cat("LESSON 1.5 COMPLETE\n")
cat("============================================================\n\n")

cat("Big idea:\n")
cat("A responsible biostatistical ML project is a workflow, not just a model.\n\n")

cat("The workflow begins with a clear clinical question and target population.\n")
cat("It defines the outcome, prediction time and candidate predictors before modelling.\n")
cat("It separates training from testing, evaluates unseen-patient performance,\n")
cat("checks leakage, studies thresholds, and reports limitations honestly.\n\n")

cat("This completes Module 1: Foundations of Machine Learning in Biostatistics.\n")

