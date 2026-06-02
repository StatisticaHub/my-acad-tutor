# Lesson 1.2: Prediction vs Explanation vs Causal Thinking
# Machine Learning in Biostatistics
#
# Aim:
# This script teaches students that prediction, statistical explanation,
# and causal thinking are related but different modelling goals.
#
# Shared course dataset:
# public/ml-biostatistics/data/shared-diabetes-prediction-data.csv
#
# Required packages:
# install.packages(c("dplyr", "readr", "ggplot2", "broom"))

library(dplyr)
library(readr)
library(ggplot2)
library(broom)

set.seed(2026)

# ------------------------------------------------------------
# 1. Load shared course dataset
# ------------------------------------------------------------

diabetes_data <- read_csv(
  "public/ml-biostatistics/data/shared-diabetes-prediction-data.csv",
  show_col_types = FALSE
)

cat("\n============================================================\n")
cat("LESSON 1.2: PREDICTION VS EXPLANATION VS CAUSAL THINKING\n")
cat("============================================================\n\n")

cat("Dataset loaded successfully.\n")
cat("Rows:", nrow(diabetes_data), "\n")
cat("Columns:", ncol(diabetes_data), "\n\n")

cat("Variables available:\n")
print(names(diabetes_data))

cat("\nOutcome:\n")
cat("- diabetes: neg or pos\n")
cat("- diabetes_binary: 0 for negative, 1 for positive\n\n")

# ------------------------------------------------------------
# 2. Three different questions
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("THREE DIFFERENT MODELLING QUESTIONS\n")
cat("------------------------------------------------------------\n\n")

cat("1. Prediction question:\n")
cat("Can routinely measured clinical variables predict diabetes status in a new patient?\n\n")

cat("2. Explanation question:\n")
cat("Which variables are statistically associated with diabetes status in this dataset?\n\n")

cat("3. Causal question:\n")
cat("Would changing a risk factor, such as BMI or glucose, change the probability of diabetes?\n\n")

cat("Important distinction:\n")
cat("A variable may help prediction without being causal.\n")
cat("A causal factor may not always improve prediction strongly.\n")
cat("A model coefficient is not automatically a causal effect.\n\n")

# ------------------------------------------------------------
# 3. Compare group summaries
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("DESCRIPTIVE COMPARISON BY DIABETES STATUS\n")
cat("------------------------------------------------------------\n\n")

group_summary <- diabetes_data %>%
  group_by(diabetes) %>%
  summarise(
    n = n(),
    mean_glucose = mean(glucose, na.rm = TRUE),
    median_glucose = median(glucose, na.rm = TRUE),
    mean_bmi = mean(mass, na.rm = TRUE),
    median_bmi = median(mass, na.rm = TRUE),
    mean_age = mean(age, na.rm = TRUE),
    median_age = median(age, na.rm = TRUE),
    .groups = "drop"
  )

print(group_summary)

cat("\nInterpretation:\n")
cat("The diabetes-positive group appears to have higher glucose and BMI on average.\n")
cat("This suggests association, but association alone does not prove causation.\n")
cat("For causality, we would need stronger design and assumptions.\n\n")

# ------------------------------------------------------------
# 4. Prediction model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PREDICTION MODEL\n")
cat("------------------------------------------------------------\n\n")

cat("Goal:\n")
cat("Use glucose, BMI/mass and age to predict diabetes status.\n\n")

train_id <- sample(
  seq_len(nrow(diabetes_data)),
  size = 0.7 * nrow(diabetes_data)
)

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

prediction_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = train_data,
  family = binomial
)

test_data <- test_data %>%
  mutate(
    predicted_risk = predict(prediction_model, newdata = test_data, type = "response"),
    predicted_class = ifelse(predicted_risk >= 0.5, 1, 0)
  )

confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tn <- confusion_matrix["0", "0"]
fp <- confusion_matrix["0", "1"]
fn <- confusion_matrix["1", "0"]
tp <- confusion_matrix["1", "1"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)

cat("Prediction model fitted on training data.\n")
cat("Model formula: diabetes_binary ~ glucose + mass + age\n\n")

cat("Test confusion matrix:\n")
print(confusion_matrix)

cat("\nPrediction performance:\n")
cat("Accuracy:", round(accuracy, 3), "\n")
cat("Sensitivity:", round(sensitivity, 3), "\n")
cat("Specificity:", round(specificity, 3), "\n\n")

cat("Prediction interpretation:\n")
cat("The model gives each patient a predicted probability of diabetes.\n")
cat("The goal is not to prove that glucose, BMI or age cause diabetes.\n")
cat("The goal is to estimate risk in unseen patients.\n\n")

# ------------------------------------------------------------
# 5. Explanation model
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("EXPLANATION / ASSOCIATION MODEL\n")
cat("------------------------------------------------------------\n\n")

cat("Goal:\n")
cat("Look at model coefficients to understand associations in the data.\n\n")

explanation_model <- glm(
  diabetes_binary ~ glucose + mass + age,
  data = diabetes_data,
  family = binomial
)

coef_table <- tidy(explanation_model, exponentiate = TRUE, conf.int = TRUE)

cat("Odds-ratio style coefficient table:\n")
print(coef_table)

cat("\nExplanation interpretation:\n")
cat("The exponentiated coefficients are odds ratios from this logistic regression model.\n")
cat("They describe statistical associations after adjusting for the other variables in the model.\n")
cat("They should still not be interpreted as causal effects without a causal design.\n\n")

# ------------------------------------------------------------
# 6. Causal thinking warning
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("CAUSAL THINKING WARNING\n")
cat("------------------------------------------------------------\n\n")

cat("A causal question would ask something like:\n")
cat("Would reducing BMI reduce future diabetes risk?\n\n")

cat("To answer that, we would need to think about:\n")
cat("- Time order\n")
cat("- Confounding\n")
cat("- Measurement error\n")
cat("- Selection bias\n")
cat("- Intervention definition\n")
cat("- Causal assumptions\n")
cat("- Study design\n\n")

cat("Why prediction is not causation:\n")
cat("A model can predict well using variables that are markers, proxies or consequences.\n")
cat("For example, a variable measured after disease begins may predict disease status very well,\n")
cat("but using it would not answer a causal prevention question.\n\n")

# ------------------------------------------------------------
# 7. A simple leakage example
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("LEAKAGE EXAMPLE\n")
cat("------------------------------------------------------------\n\n")

cat("Suppose a variable were measured after diagnosis.\n")
cat("It might predict diabetes extremely well, but it would not be available at the true prediction time.\n")
cat("That would create leakage.\n\n")

cat("Leakage Monster says:\n")
cat("'If you let future information enter the model, I can make the model look impressive but useless.'\n\n")

# ------------------------------------------------------------
# 8. Save figures for Lesson 1.2
# ------------------------------------------------------------

dir.create(
  "public/ml-biostatistics/figures/module-1",
  recursive = TRUE,
  showWarnings = FALSE
)

# Figure 1: Glucose distribution by diabetes status
p1 <- ggplot(diabetes_data, aes(x = glucose, fill = diabetes)) +
  geom_density(alpha = 0.45) +
  labs(
    title = "Glucose distribution by diabetes status",
    subtitle = "Glucose helps prediction, but association is not the same as causation.",
    x = "Glucose",
    y = "Density",
    fill = "Observed diabetes"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-2-glucose-density.png",
  p1,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 2: Predicted risk by observed diabetes status
p2 <- ggplot(test_data, aes(x = diabetes, y = predicted_risk)) +
  geom_boxplot(fill = "grey90", colour = "grey30") +
  labs(
    title = "Predicted risk by observed diabetes status",
    subtitle = "Prediction models estimate risk; they do not prove causal effects.",
    x = "Observed diabetes status",
    y = "Predicted diabetes risk"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-2-predicted-risk-boxplot.png",
  p2,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 3: Prediction vs explanation vs causality diagram
concept_data <- data.frame(
  concept = factor(
    c("Prediction", "Explanation", "Causal thinking"),
    levels = c("Prediction", "Explanation", "Causal thinking")
  ),
  focus = c(
    "Estimate outcomes for new patients",
    "Describe associations in the data",
    "Ask what would happen under intervention"
  )
)

p3 <- ggplot(concept_data, aes(x = concept, y = 1)) +
  geom_point(size = 8) +
  geom_text(aes(label = focus), vjust = -1.2, size = 4) +
  ylim(0.5, 1.7) +
  labs(
    title = "Prediction, explanation and causality answer different questions",
    x = "",
    y = ""
  ) +
  theme_minimal(base_size = 14) +
  theme(
    axis.text.y = element_blank(),
    axis.ticks.y = element_blank(),
    panel.grid = element_blank()
  )

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-2-three-questions.png",
  p3,
  width = 9,
  height = 5,
  dpi = 300
)

cat("\n------------------------------------------------------------\n")
cat("FIGURES SAVED\n")
cat("------------------------------------------------------------\n\n")

cat("Saved:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-2-glucose-density.png\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-2-predicted-risk-boxplot.png\n")
cat("3. public/ml-biostatistics/figures/module-1/lesson-1-2-three-questions.png\n\n")

# ------------------------------------------------------------
# 9. Final lesson message
# ------------------------------------------------------------

cat("============================================================\n")
cat("LESSON 1.2 COMPLETE\n")
cat("============================================================\n\n")

cat("Big idea:\n")
cat("Prediction, explanation and causal thinking are not the same.\n")
cat("Prediction asks: Can we estimate an outcome for a new patient?\n")
cat("Explanation asks: Which variables are associated with the outcome?\n")
cat("Causality asks: What would happen if we intervened?\n\n")

cat("In medical machine learning, confusing these questions can lead to unsafe interpretation.\n")
cat("A good prediction model must be validated carefully, and its coefficients should not be treated as causal effects without proper causal reasoning.\n\n")

