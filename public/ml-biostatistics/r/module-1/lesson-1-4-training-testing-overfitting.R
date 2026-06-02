# Lesson 1.4: Training, Testing, Overfitting and Generalisation
# Machine Learning in Biostatistics
#
# Aim:
# This script introduces:
# 1. Training data
# 2. Test data
# 3. Generalisation
# 4. Overfitting
# 5. Leakage
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
cat("LESSON 1.4: TRAINING, TESTING, OVERFITTING AND GENERALISATION\n")
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
# 2. Big idea
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("BIG IDEA\n")
cat("------------------------------------------------------------\n\n")

cat("A model should not only perform well on the data it learned from.\n")
cat("A useful medical prediction model should generalise to new patients.\n\n")

cat("Training data:\n")
cat("- Used to fit the model.\n")
cat("- The model is allowed to learn patterns from these patients.\n\n")

cat("Test data:\n")
cat("- Held back from model fitting.\n")
cat("- Used to estimate performance on unseen patients.\n\n")

cat("Overfitting:\n")
cat("- The model learns noise or accidental patterns in the training data.\n")
cat("- Training performance looks good, but test performance is worse.\n\n")

cat("Leakage:\n")
cat("- Information enters the model that would not be available at the true prediction time.\n")
cat("- Leakage can make a model look excellent but invalid.\n\n")

# ------------------------------------------------------------
# 3. Prepare analysis dataset
# ------------------------------------------------------------

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

cat("\n------------------------------------------------------------\n")
cat("ANALYSIS DATASET\n")
cat("------------------------------------------------------------\n\n")

cat("Rows after selecting variables and removing missing values:", nrow(analysis_data), "\n")
cat("Outcome distribution:\n")
print(table(analysis_data$diabetes))

cat("\nOutcome percentages:\n")
print(round(100 * prop.table(table(analysis_data$diabetes)), 1))

# ------------------------------------------------------------
# 4. Train/test split
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("TRAIN / TEST SPLIT\n")
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
cat("The training data are used for model fitting.\n")
cat("The test data are held back and used only for evaluation.\n")
cat("This gives a more honest estimate of how the model may perform for new patients.\n\n")

# ------------------------------------------------------------
# 5. Helper function for model performance
# ------------------------------------------------------------

calculate_metrics <- function(observed, predicted_class, predicted_risk) {
  observed <- factor(observed, levels = c(0, 1))
  predicted_class <- factor(predicted_class, levels = c(0, 1))

  cm <- table(Observed = observed, Predicted = predicted_class)

  tn <- cm["0", "0"]
  fp <- cm["0", "1"]
  fn <- cm["1", "0"]
  tp <- cm["1", "1"]

  accuracy <- (tp + tn) / sum(cm)
  sensitivity <- tp / (tp + fn)
  specificity <- tn / (tn + fp)
  brier <- mean((as.numeric(as.character(observed)) - predicted_risk)^2)

  roc_obj <- roc(
    response = as.numeric(as.character(observed)),
    predictor = predicted_risk,
    quiet = TRUE
  )

  auc_value <- as.numeric(auc(roc_obj))

  list(
    confusion_matrix = cm,
    accuracy = accuracy,
    sensitivity = sensitivity,
    specificity = specificity,
    brier = brier,
    auc = auc_value
  )
}

# ------------------------------------------------------------
# 6. Model A: Simple model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("MODEL A: SIMPLE MODEL\n")
cat("------------------------------------------------------------\n\n")

cat("Model A uses three predictors: glucose, BMI/mass and age.\n")
cat("This model is easier to interpret and less flexible.\n\n")

simple_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

train_data <- train_data %>%
  mutate(
    simple_risk = predict(simple_model, newdata = train_data, type = "response"),
    simple_class = ifelse(simple_risk >= 0.5, 1, 0)
  )

test_data <- test_data %>%
  mutate(
    simple_risk = predict(simple_model, newdata = test_data, type = "response"),
    simple_class = ifelse(simple_risk >= 0.5, 1, 0)
  )

simple_train_metrics <- calculate_metrics(
  observed = train_data$diabetes_binary,
  predicted_class = train_data$simple_class,
  predicted_risk = train_data$simple_risk
)

simple_test_metrics <- calculate_metrics(
  observed = test_data$diabetes_binary,
  predicted_class = test_data$simple_class,
  predicted_risk = test_data$simple_risk
)

cat("Simple model training confusion matrix:\n")
print(simple_train_metrics$confusion_matrix)

cat("\nSimple model test confusion matrix:\n")
print(simple_test_metrics$confusion_matrix)

cat("\nSimple model performance:\n")
cat("Training accuracy:", round(simple_train_metrics$accuracy, 3), "\n")
cat("Test accuracy:", round(simple_test_metrics$accuracy, 3), "\n")
cat("Training AUC:", round(simple_train_metrics$auc, 3), "\n")
cat("Test AUC:", round(simple_test_metrics$auc, 3), "\n")
cat("Test sensitivity:", round(simple_test_metrics$sensitivity, 3), "\n")
cat("Test specificity:", round(simple_test_metrics$specificity, 3), "\n")
cat("Test Brier score:", round(simple_test_metrics$brier, 3), "\n\n")

# ------------------------------------------------------------
# 7. Model B: Larger model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("MODEL B: LARGER MODEL\n")
cat("------------------------------------------------------------\n\n")

cat("Model B uses all available clinical predictors.\n")
cat("It is more flexible than the simple model.\n\n")

larger_model <- glm(
  diabetes_binary ~ pregnant + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

train_data <- train_data %>%
  mutate(
    larger_risk = predict(larger_model, newdata = train_data, type = "response"),
    larger_class = ifelse(larger_risk >= 0.5, 1, 0)
  )

test_data <- test_data %>%
  mutate(
    larger_risk = predict(larger_model, newdata = test_data, type = "response"),
    larger_class = ifelse(larger_risk >= 0.5, 1, 0)
  )

larger_train_metrics <- calculate_metrics(
  observed = train_data$diabetes_binary,
  predicted_class = train_data$larger_class,
  predicted_risk = train_data$larger_risk
)

larger_test_metrics <- calculate_metrics(
  observed = test_data$diabetes_binary,
  predicted_class = test_data$larger_class,
  predicted_risk = test_data$larger_risk
)

cat("Larger model training confusion matrix:\n")
print(larger_train_metrics$confusion_matrix)

cat("\nLarger model test confusion matrix:\n")
print(larger_test_metrics$confusion_matrix)

cat("\nLarger model performance:\n")
cat("Training accuracy:", round(larger_train_metrics$accuracy, 3), "\n")
cat("Test accuracy:", round(larger_test_metrics$accuracy, 3), "\n")
cat("Training AUC:", round(larger_train_metrics$auc, 3), "\n")
cat("Test AUC:", round(larger_test_metrics$auc, 3), "\n")
cat("Test sensitivity:", round(larger_test_metrics$sensitivity, 3), "\n")
cat("Test specificity:", round(larger_test_metrics$specificity, 3), "\n")
cat("Test Brier score:", round(larger_test_metrics$brier, 3), "\n\n")

# ------------------------------------------------------------
# 8. Model C: Deliberately over-flexible model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("MODEL C: DELIBERATELY OVER-FLEXIBLE MODEL\n")
cat("------------------------------------------------------------\n\n")

cat("Model C adds squared terms and interactions.\n")
cat("This is not automatically wrong, but it increases flexibility.\n")
cat("More flexibility can improve training performance while weakening generalisation.\n\n")

overflexible_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure + insulin + pedigree +
    I(glucose^2) + I(mass^2) + I(age^2) +
    glucose:mass + glucose:age + mass:age,
  data = train_data,
  family = binomial
)

train_data <- train_data %>%
  mutate(
    overflexible_risk = predict(overflexible_model, newdata = train_data, type = "response"),
    overflexible_class = ifelse(overflexible_risk >= 0.5, 1, 0)
  )

test_data <- test_data %>%
  mutate(
    overflexible_risk = predict(overflexible_model, newdata = test_data, type = "response"),
    overflexible_class = ifelse(overflexible_risk >= 0.5, 1, 0)
  )

overflexible_train_metrics <- calculate_metrics(
  observed = train_data$diabetes_binary,
  predicted_class = train_data$overflexible_class,
  predicted_risk = train_data$overflexible_risk
)

overflexible_test_metrics <- calculate_metrics(
  observed = test_data$diabetes_binary,
  predicted_class = test_data$overflexible_class,
  predicted_risk = test_data$overflexible_risk
)

cat("Over-flexible model training confusion matrix:\n")
print(overflexible_train_metrics$confusion_matrix)

cat("\nOver-flexible model test confusion matrix:\n")
print(overflexible_test_metrics$confusion_matrix)

cat("\nOver-flexible model performance:\n")
cat("Training accuracy:", round(overflexible_train_metrics$accuracy, 3), "\n")
cat("Test accuracy:", round(overflexible_test_metrics$accuracy, 3), "\n")
cat("Training AUC:", round(overflexible_train_metrics$auc, 3), "\n")
cat("Test AUC:", round(overflexible_test_metrics$auc, 3), "\n")
cat("Test sensitivity:", round(overflexible_test_metrics$sensitivity, 3), "\n")
cat("Test specificity:", round(overflexible_test_metrics$specificity, 3), "\n")
cat("Test Brier score:", round(overflexible_test_metrics$brier, 3), "\n\n")

# ------------------------------------------------------------
# 9. Performance comparison table
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PERFORMANCE COMPARISON\n")
cat("------------------------------------------------------------\n\n")

performance_table <- data.frame(
  model = c(
    "Simple model",
    "Larger model",
    "Over-flexible model"
  ),
  training_accuracy = c(
    simple_train_metrics$accuracy,
    larger_train_metrics$accuracy,
    overflexible_train_metrics$accuracy
  ),
  test_accuracy = c(
    simple_test_metrics$accuracy,
    larger_test_metrics$accuracy,
    overflexible_test_metrics$accuracy
  ),
  training_auc = c(
    simple_train_metrics$auc,
    larger_train_metrics$auc,
    overflexible_train_metrics$auc
  ),
  test_auc = c(
    simple_test_metrics$auc,
    larger_test_metrics$auc,
    overflexible_test_metrics$auc
  ),
  test_sensitivity = c(
    simple_test_metrics$sensitivity,
    larger_test_metrics$sensitivity,
    overflexible_test_metrics$sensitivity
  ),
  test_specificity = c(
    simple_test_metrics$specificity,
    larger_test_metrics$specificity,
    overflexible_test_metrics$specificity
  ),
  test_brier = c(
    simple_test_metrics$brier,
    larger_test_metrics$brier,
    overflexible_test_metrics$brier
  )
)

performance_table <- performance_table %>%
  mutate(
    generalisation_gap_accuracy = training_accuracy - test_accuracy,
    generalisation_gap_auc = training_auc - test_auc
  )

print(
  performance_table %>%
    mutate(across(where(is.numeric), ~ round(.x, 3)))
)

cat("\nInterpretation:\n")
cat("The best model is not necessarily the model with the best training performance.\n")
cat("The important question is how well the model performs on unseen test data.\n")
cat("A large training-test gap suggests possible overfitting.\n\n")

# ------------------------------------------------------------
# 10. Leakage demonstration
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("LEAKAGE DEMONSTRATION\n")
cat("------------------------------------------------------------\n\n")

cat("Now we deliberately create a leakage variable.\n")
cat("This variable is almost a disguised copy of the outcome.\n")
cat("A real example might be a future diagnosis code, post-outcome treatment, or follow-up information.\n\n")

train_data <- train_data %>%
  mutate(
    leakage_marker = diabetes_binary + rnorm(n(), mean = 0, sd = 0.05)
  )

test_data <- test_data %>%
  mutate(
    leakage_marker = diabetes_binary + rnorm(n(), mean = 0, sd = 0.05)
  )

leakage_model <- glm(
  diabetes_binary ~ glucose + mass + age + leakage_marker,
  data = train_data,
  family = binomial
)

test_data <- test_data %>%
  mutate(
    leakage_risk = predict(leakage_model, newdata = test_data, type = "response"),
    leakage_class = ifelse(leakage_risk >= 0.5, 1, 0)
  )

leakage_test_metrics <- calculate_metrics(
  observed = test_data$diabetes_binary,
  predicted_class = test_data$leakage_class,
  predicted_risk = test_data$leakage_risk
)

cat("Leakage model test confusion matrix:\n")
print(leakage_test_metrics$confusion_matrix)

cat("\nLeakage model performance:\n")
cat("Test accuracy:", round(leakage_test_metrics$accuracy, 3), "\n")
cat("Test AUC:", round(leakage_test_metrics$auc, 3), "\n")
cat("Test sensitivity:", round(leakage_test_metrics$sensitivity, 3), "\n")
cat("Test specificity:", round(leakage_test_metrics$specificity, 3), "\n\n")

cat("Leakage interpretation:\n")
cat("The leakage model may appear extremely strong because it contains information too close to the outcome.\n")
cat("This is not valid clinical prediction.\n")
cat("A model must only use variables available at the real prediction time.\n\n")

# ------------------------------------------------------------
# 11. Save figures for Lesson 1.4
# ------------------------------------------------------------

dir.create(
  "public/ml-biostatistics/figures/module-1",
  recursive = TRUE,
  showWarnings = FALSE
)

# Figure 1: Train/test split outcome distribution
split_plot_data <- bind_rows(
  train_data %>%
    select(diabetes) %>%
    mutate(split = "Training data"),
  test_data %>%
    select(diabetes) %>%
    mutate(split = "Test data")
)

p1 <- ggplot(split_plot_data, aes(x = diabetes, fill = split)) +
  geom_bar(position = "dodge") +
  labs(
    title = "Training and test data outcome distribution",
    subtitle = "The model learns from training data and is evaluated on test data.",
    x = "Diabetes status",
    y = "Number of patients",
    fill = "Data split"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-4-train-test-distribution.png",
  p1,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 2: Training vs test accuracy
accuracy_plot_data <- performance_table %>%
  select(model, training_accuracy, test_accuracy) %>%
  tidyr::pivot_longer(
    cols = c(training_accuracy, test_accuracy),
    names_to = "data_split",
    values_to = "accuracy"
  ) %>%
  mutate(
    data_split = recode(
      data_split,
      training_accuracy = "Training accuracy",
      test_accuracy = "Test accuracy"
    )
  )

p2 <- ggplot(accuracy_plot_data, aes(x = model, y = accuracy, fill = data_split)) +
  geom_col(position = "dodge") +
  coord_cartesian(ylim = c(0, 1)) +
  labs(
    title = "Training accuracy vs test accuracy",
    subtitle = "Overfitting is suspected when training performance is better than test performance.",
    x = "Model",
    y = "Accuracy",
    fill = "Performance"
  ) +
  theme_minimal(base_size = 14) +
  theme(axis.text.x = element_text(angle = 20, hjust = 1))

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-accuracy.png",
  p2,
  width = 9,
  height = 5,
  dpi = 300
)

# Figure 3: Training vs test AUC
auc_plot_data <- performance_table %>%
  select(model, training_auc, test_auc) %>%
  tidyr::pivot_longer(
    cols = c(training_auc, test_auc),
    names_to = "data_split",
    values_to = "auc"
  ) %>%
  mutate(
    data_split = recode(
      data_split,
      training_auc = "Training AUC",
      test_auc = "Test AUC"
    )
  )

p3 <- ggplot(auc_plot_data, aes(x = model, y = auc, fill = data_split)) +
  geom_col(position = "dodge") +
  coord_cartesian(ylim = c(0, 1)) +
  labs(
    title = "Training AUC vs test AUC",
    subtitle = "A model should be judged mainly by performance on unseen data.",
    x = "Model",
    y = "AUC",
    fill = "Performance"
  ) +
  theme_minimal(base_size = 14) +
  theme(axis.text.x = element_text(angle = 20, hjust = 1))

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-auc.png",
  p3,
  width = 9,
  height = 5,
  dpi = 300
)

# Figure 4: Predicted risk comparison
risk_plot_data <- bind_rows(
  test_data %>%
    transmute(
      diabetes = diabetes,
      predicted_risk = simple_risk,
      model = "Simple model"
    ),
  test_data %>%
    transmute(
      diabetes = diabetes,
      predicted_risk = larger_risk,
      model = "Larger model"
    ),
  test_data %>%
    transmute(
      diabetes = diabetes,
      predicted_risk = overflexible_risk,
      model = "Over-flexible model"
    )
)

p4 <- ggplot(risk_plot_data, aes(x = predicted_risk, fill = diabetes)) +
  geom_histogram(position = "identity", alpha = 0.55, bins = 25) +
  facet_wrap(~ model) +
  labs(
    title = "Predicted risk distributions in the test data",
    subtitle = "The model should separate risk in unseen patients, not only in training data.",
    x = "Predicted diabetes risk",
    y = "Number of patients",
    fill = "Observed diabetes"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-4-test-risk-distributions.png",
  p4,
  width = 10,
  height = 6,
  dpi = 300
)

# Figure 5: Leakage warning
leakage_plot_data <- data.frame(
  model = c("Valid model", "Leakage model"),
  test_auc = c(simple_test_metrics$auc, leakage_test_metrics$auc),
  test_accuracy = c(simple_test_metrics$accuracy, leakage_test_metrics$accuracy)
)

leakage_long <- leakage_plot_data %>%
  tidyr::pivot_longer(
    cols = c(test_auc, test_accuracy),
    names_to = "metric",
    values_to = "value"
  ) %>%
  mutate(
    metric = recode(
      metric,
      test_auc = "Test AUC",
      test_accuracy = "Test accuracy"
    )
  )

p5 <- ggplot(leakage_long, aes(x = model, y = value, fill = metric)) +
  geom_col(position = "dodge") +
  coord_cartesian(ylim = c(0, 1)) +
  labs(
    title = "Leakage can make a model look unrealistically strong",
    subtitle = "Excellent performance is not trustworthy if the predictors include future or outcome information.",
    x = "Model type",
    y = "Performance",
    fill = "Metric"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-4-leakage-warning.png",
  p5,
  width = 9,
  height = 5,
  dpi = 300
)

cat("\n------------------------------------------------------------\n")
cat("FIGURES SAVED\n")
cat("------------------------------------------------------------\n\n")

cat("Saved:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-4-train-test-distribution.png\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-accuracy.png\n")
cat("3. public/ml-biostatistics/figures/module-1/lesson-1-4-training-vs-test-auc.png\n")
cat("4. public/ml-biostatistics/figures/module-1/lesson-1-4-test-risk-distributions.png\n")
cat("5. public/ml-biostatistics/figures/module-1/lesson-1-4-leakage-warning.png\n\n")

# ------------------------------------------------------------
# 12. Final lesson message
# ------------------------------------------------------------

cat("============================================================\n")
cat("LESSON 1.4 COMPLETE\n")
cat("============================================================\n\n")

cat("Big idea:\n")
cat("A prediction model must be judged by how well it generalises to unseen patients.\n\n")

cat("Training performance tells us how well the model fits the data it learned from.\n")
cat("Test performance gives a more honest estimate of how the model may perform in new patients.\n")
cat("Overfitting occurs when a model learns training-specific noise rather than generalisable signal.\n")
cat("Leakage occurs when information unavailable at prediction time enters the model.\n\n")

cat("In medical machine learning, a model that looks excellent may still be unsafe if it overfits or leaks future information.\n")

