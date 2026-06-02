# Case Study 1: Diabetes Risk Prediction
# Logistic regression, classification metrics, ROC/AUC, calibration and figures.

# Install required packages if needed:
# install.packages(c("pROC", "ggplot2", "dplyr", "readr"))

library(dplyr)
library(readr)
library(ggplot2)
library(pROC)

set.seed(2026)

diabetes_data <- read_csv("public/ml-biostatistics/data/shared-diabetes-prediction-data.csv", show_col_types = FALSE)

train_id <- sample(seq_len(nrow(diabetes_data)), size = 0.8 * nrow(diabetes_data))

train_data <- diabetes_data[train_id, ]
test_data <- diabetes_data[-train_id, ]

model <- glm(
  diabetes_binary ~ pregnant + glucose + pressure + triceps +
    insulin + mass + pedigree + age,
  data = train_data,
  family = binomial
)

test_data <- test_data %>%
  mutate(
    predicted_risk = predict(model, newdata = test_data, type = "response"),
    predicted_class = ifelse(predicted_risk >= 0.5, 1, 0)
  )

confusion_matrix <- table(
  Observed = test_data$diabetes_binary,
  Predicted = test_data$predicted_class
)

accuracy <- mean(test_data$diabetes_binary == test_data$predicted_class)

tp <- confusion_matrix["1", "1"]
tn <- confusion_matrix["0", "0"]
fp <- confusion_matrix["0", "1"]
fn <- confusion_matrix["1", "0"]

sensitivity <- tp / (tp + fn)
specificity <- tn / (tn + fp)
ppv <- tp / (tp + fp)
npv <- tn / (tn + fn)

roc_obj <- roc(test_data$diabetes_binary, test_data$predicted_risk)
auc_value <- auc(roc_obj)

brier_score <- mean((test_data$diabetes_binary - test_data$predicted_risk)^2)

cat("Case Study 1: Diabetes Risk Prediction\n")
cat("--------------------------------------\n")
cat("Accuracy:", round(accuracy, 3), "\n")
cat("Sensitivity:", round(sensitivity, 3), "\n")
cat("Specificity:", round(specificity, 3), "\n")
cat("PPV:", round(ppv, 3), "\n")
cat("NPV:", round(npv, 3), "\n")
cat("AUC:", round(as.numeric(auc_value), 3), "\n")
cat("Brier score:", round(brier_score, 3), "\n\n")

print(confusion_matrix)

# Create figures folder if needed
dir.create("public/ml-biostatistics/figures/case-study-1", recursive = TRUE, showWarnings = FALSE)

# Outcome distribution
p1 <- ggplot(diabetes_data, aes(x = diabetes, fill = diabetes)) +
  geom_bar(show.legend = FALSE) +
  labs(
    title = "Diabetes outcome distribution",
    x = "Diabetes status",
    y = "Number of patients"
  ) +
  theme_minimal()

ggsave(
  "public/ml-biostatistics/figures/case-study-1/diabetes-outcome-distribution.png",
  p1,
  width = 7,
  height = 5,
  dpi = 300
)

# ROC curve
roc_data <- data.frame(
  specificity = roc_obj$specificities,
  sensitivity = roc_obj$sensitivities
)

p2 <- ggplot(roc_data, aes(x = 1 - specificity, y = sensitivity)) +
  geom_line(linewidth = 1) +
  geom_abline(linetype = "dashed") +
  labs(
    title = paste0("ROC curve, AUC = ", round(as.numeric(auc_value), 3)),
    x = "1 - Specificity",
    y = "Sensitivity"
  ) +
  theme_minimal()

ggsave(
  "public/ml-biostatistics/figures/case-study-1/diabetes-roc-curve.png",
  p2,
  width = 7,
  height = 5,
  dpi = 300
)

# Calibration plot by decile
calibration_data <- test_data %>%
  mutate(risk_group = ntile(predicted_risk, 10)) %>%
  group_by(risk_group) %>%
  summarise(
    mean_predicted_risk = mean(predicted_risk),
    observed_risk = mean(diabetes_binary),
    n = n(),
    .groups = "drop"
  )

p3 <- ggplot(calibration_data, aes(x = mean_predicted_risk, y = observed_risk)) +
  geom_point(size = 3) +
  geom_line() +
  geom_abline(linetype = "dashed") +
  coord_equal(xlim = c(0, 1), ylim = c(0, 1)) +
  labs(
    title = "Calibration plot",
    x = "Mean predicted risk",
    y = "Observed risk"
  ) +
  theme_minimal()

ggsave(
  "public/ml-biostatistics/figures/case-study-1/diabetes-calibration-plot.png",
  p3,
  width = 7,
  height = 5,
  dpi = 300
)

cat("\nFigures saved to public/ml-biostatistics/figures/case-study-1/\n")
