# Lesson 1.3: Types of Learning
# Supervised, Unsupervised and Semi-supervised Learning
# Machine Learning in Biostatistics
#
# Aim:
# This script introduces the three major learning settings:
# 1. Supervised learning
# 2. Unsupervised learning
# 3. Semi-supervised learning
#
# Shared course dataset:
# public/ml-biostatistics/data/shared-diabetes-prediction-data.csv
#
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
cat("LESSON 1.3: TYPES OF LEARNING\n")
cat("SUPERVISED, UNSUPERVISED AND SEMI-SUPERVISED LEARNING\n")
cat("============================================================\n\n")

cat("Dataset loaded successfully.\n")
cat("Rows:", nrow(diabetes_data), "\n")
cat("Columns:", ncol(diabetes_data), "\n\n")

cat("Variables available:\n")
print(names(diabetes_data))

cat("\nOutcome variable:\n")
cat("- diabetes: neg or pos\n")
cat("- diabetes_binary: 0 for negative, 1 for positive\n\n")

cat("Candidate predictors:\n")
cat("- pregnant, glucose, pressure, triceps, insulin, mass, pedigree, age\n\n")

# ------------------------------------------------------------
# 2. Big idea: what changes across learning types?
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("BIG IDEA\n")
cat("------------------------------------------------------------\n\n")

cat("The main difference between learning types is the role of the outcome label.\n\n")

cat("Supervised learning:\n")
cat("- We have predictors X and an observed outcome Y.\n")
cat("- Example: Predict diabetes status using glucose, BMI and age.\n\n")

cat("Unsupervised learning:\n")
cat("- We have predictors X but no outcome label is used during learning.\n")
cat("- Example: Find patient subgroups using glucose, BMI and age only.\n\n")

cat("Semi-supervised learning:\n")
cat("- Some patients have outcome labels and some do not.\n")
cat("- Example: A hospital has diabetes labels for some patients, but many records are unlabelled.\n\n")

# ------------------------------------------------------------
# 3. Prepare variables for modelling
# ------------------------------------------------------------

analysis_data <- diabetes_data %>%
  select(
    diabetes,
    diabetes_binary,
    glucose,
    mass,
    age,
    pressure,
    insulin,
    pedigree
  ) %>%
  na.omit()

cat("\n------------------------------------------------------------\n")
cat("ANALYSIS DATASET\n")
cat("------------------------------------------------------------\n\n")

cat("Rows after selecting variables and removing missing values:", nrow(analysis_data), "\n")
cat("Outcome distribution:\n")
print(table(analysis_data$diabetes))

cat("\nInterpretation:\n")
cat("For supervised learning, diabetes status is the outcome label.\n")
cat("For unsupervised learning, we temporarily ignore the diabetes label.\n")
cat("For semi-supervised learning, we pretend only some labels are available.\n\n")

# ------------------------------------------------------------
# 4. Supervised learning example
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PART A: SUPERVISED LEARNING\n")
cat("------------------------------------------------------------\n\n")

cat("Question:\n")
cat("Can we predict diabetes status from clinical predictors?\n\n")

cat("Learning structure:\n")
cat("X = glucose, BMI/mass, age, blood pressure, insulin, pedigree\n")
cat("Y = diabetes status\n\n")

train_id <- sample(
  seq_len(nrow(analysis_data)),
  size = 0.7 * nrow(analysis_data)
)

train_data <- analysis_data[train_id, ]
test_data <- analysis_data[-train_id, ]

supervised_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure + insulin + pedigree,
  data = train_data,
  family = binomial
)

test_data <- test_data %>%
  mutate(
    predicted_risk = predict(supervised_model, newdata = test_data, type = "response"),
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

cat("Supervised model fitted: logistic regression.\n")
cat("Test confusion matrix:\n")
print(confusion_matrix)

cat("\nSupervised learning performance:\n")
cat("Accuracy:", round(accuracy, 3), "\n")
cat("Sensitivity:", round(sensitivity, 3), "\n")
cat("Specificity:", round(specificity, 3), "\n\n")

cat("Interpretation:\n")
cat("This is supervised learning because the model learns from examples where the outcome is known.\n")
cat("The model uses labelled patients to estimate diabetes risk for unseen patients.\n\n")

# ------------------------------------------------------------
# 5. Unsupervised learning example
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PART B: UNSUPERVISED LEARNING\n")
cat("------------------------------------------------------------\n\n")

cat("Question:\n")
cat("Can we find patient subgroups without using diabetes labels?\n\n")

cat("Learning structure:\n")
cat("X = clinical measurements\n")
cat("Y is not used during learning\n\n")

unsupervised_x <- analysis_data %>%
  select(glucose, mass, age, pressure, insulin, pedigree)

unsupervised_scaled <- scale(unsupervised_x)

kmeans_fit <- kmeans(
  unsupervised_scaled,
  centers = 3,
  nstart = 25
)

analysis_data <- analysis_data %>%
  mutate(cluster = factor(kmeans_fit$cluster))

cat("K-means clustering completed with 3 clusters.\n\n")

cat("Cluster sizes:\n")
print(table(analysis_data$cluster))

cat("\nDiabetes status by cluster, shown only after clustering:\n")
cluster_table <- table(
  Cluster = analysis_data$cluster,
  Diabetes = analysis_data$diabetes
)
print(cluster_table)

cluster_percent <- prop.table(cluster_table, margin = 1)

cat("\nWithin-cluster diabetes percentages:\n")
print(round(100 * cluster_percent, 1))

cat("\nInterpretation:\n")
cat("The clustering algorithm did not use diabetes status while forming clusters.\n")
cat("After clustering, we can compare clusters with diabetes status to understand whether the discovered groups differ clinically.\n")
cat("This is unsupervised learning because the outcome label was not used to train the clustering method.\n\n")

# ------------------------------------------------------------
# 6. PCA for visualising unsupervised structure
# ------------------------------------------------------------

pca_fit <- prcomp(
  unsupervised_scaled,
  center = TRUE,
  scale. = TRUE
)

pca_data <- data.frame(
  PC1 = pca_fit$x[, 1],
  PC2 = pca_fit$x[, 2],
  cluster = analysis_data$cluster,
  diabetes = analysis_data$diabetes
)

cat("\nPCA summary for the first two components:\n")
pca_variance <- summary(pca_fit)$importance[2, 1:2]
print(round(100 * pca_variance, 1))

cat("\nInterpretation:\n")
cat("PCA is used here only for visualising patient structure in lower dimensions.\n")
cat("It does not create a prediction model by itself.\n\n")

# ------------------------------------------------------------
# 7. Semi-supervised learning example
# ------------------------------------------------------------

cat("\n------------------------------------------------------------\n")
cat("PART C: SEMI-SUPERVISED LEARNING\n")
cat("------------------------------------------------------------\n\n")

cat("Question:\n")
cat("What if only some patients have diabetes labels?\n\n")

cat("Learning structure:\n")
cat("- Some records have X and Y.\n")
cat("- Some records have X only.\n")
cat("- The labelled data guide learning, but the unlabelled data still contain structure.\n\n")

semi_data <- analysis_data %>%
  mutate(
    label_available = ifelse(runif(n()) < 0.35, "labelled", "unlabelled"),
    observed_label = ifelse(label_available == "labelled", diabetes, "unknown")
  )

cat("Label availability:\n")
print(table(semi_data$label_available))

cat("\nObserved labels:\n")
print(table(semi_data$observed_label))

cat("\nInterpretation:\n")
cat("Only a subset of patients are treated as labelled.\n")
cat("The rest still have predictor measurements, but their diabetes label is hidden.\n")
cat("This mimics semi-supervised learning, which is common when labels are expensive, delayed or incomplete.\n\n")

labelled_data <- semi_data %>%
  filter(label_available == "labelled")

cat("Labelled rows available for a supervised model:", nrow(labelled_data), "\n\n")

semi_model <- glm(
  diabetes_binary ~ glucose + mass + age + pressure + insulin + pedigree,
  data = labelled_data,
  family = binomial
)

semi_data <- semi_data %>%
  mutate(
    semi_supervised_risk = predict(semi_model, newdata = semi_data, type = "response")
  )

cat("A simple model was fitted using only labelled patients.\n")
cat("Predicted risks were then generated for both labelled and unlabelled patients.\n\n")

cat("Predicted risk summary by label availability:\n")
risk_summary <- semi_data %>%
  group_by(label_available) %>%
  summarise(
    n = n(),
    mean_predicted_risk = mean(semi_supervised_risk),
    median_predicted_risk = median(semi_supervised_risk),
    .groups = "drop"
  )

print(risk_summary)

cat("\nInterpretation:\n")
cat("This is a simplified semi-supervised demonstration.\n")
cat("In real semi-supervised learning, algorithms may use both labelled examples and the structure of unlabelled data more directly.\n")
cat("The key idea is that labels are only partly available.\n\n")

# ------------------------------------------------------------
# 8. Save figures for Lesson 1.3
# ------------------------------------------------------------

dir.create(
  "public/ml-biostatistics/figures/module-1",
  recursive = TRUE,
  showWarnings = FALSE
)

# Figure 1: Supervised learning predicted risk
p1 <- ggplot(test_data, aes(x = predicted_risk, fill = diabetes)) +
  geom_histogram(position = "identity", alpha = 0.55, bins = 25) +
  labs(
    title = "Supervised learning: predicted diabetes risk",
    subtitle = "The model learns from labelled patients and predicts risk in test patients.",
    x = "Predicted diabetes risk",
    y = "Number of patients",
    fill = "Observed diabetes"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-3-supervised-risk.png",
  p1,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 2: Unsupervised PCA clusters
p2 <- ggplot(pca_data, aes(x = PC1, y = PC2, colour = cluster)) +
  geom_point(alpha = 0.75, size = 2) +
  labs(
    title = "Unsupervised learning: patient clusters",
    subtitle = "K-means clustering uses clinical measurements but not diabetes labels.",
    x = "Principal component 1",
    y = "Principal component 2",
    colour = "Cluster"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-3-unsupervised-clusters.png",
  p2,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 3: Semi-supervised labelled and unlabelled records
p3 <- ggplot(semi_data, aes(x = semi_supervised_risk, fill = label_available)) +
  geom_histogram(position = "identity", alpha = 0.55, bins = 25) +
  labs(
    title = "Semi-supervised setting: labelled and unlabelled patients",
    subtitle = "Only some patients have labels, but all have predictor measurements.",
    x = "Predicted diabetes risk",
    y = "Number of patients",
    fill = "Label status"
  ) +
  theme_minimal(base_size = 14)

ggsave(
  "public/ml-biostatistics/figures/module-1/lesson-1-3-semi-supervised-labels.png",
  p3,
  width = 8,
  height = 5,
  dpi = 300
)

# Figure 4: Learning type comparison diagram
learning_types <- data.frame(
  type = factor(
    c("Supervised", "Unsupervised", "Semi-supervised"),
    levels = c("Supervised", "Unsupervised", "Semi-supervised")
  ),
  label_role = c(
    "Uses known outcomes",
    "Uses no outcome labels",
    "Uses some known outcomes"
  ),
  y = c(1, 1, 1)
)

p4 <- ggplot(learning_types, aes(x = type, y = y)) +
  geom_point(size = 8) +
  geom_text(aes(label = label_role), vjust = -1.2, size = 4) +
  ylim(0.5, 1.7) +
  labs(
    title = "Types of learning differ by how outcome labels are used",
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
  "public/ml-biostatistics/figures/module-1/lesson-1-3-learning-types.png",
  p4,
  width = 9,
  height = 5,
  dpi = 300
)

cat("\n------------------------------------------------------------\n")
cat("FIGURES SAVED\n")
cat("------------------------------------------------------------\n\n")

cat("Saved:\n")
cat("1. public/ml-biostatistics/figures/module-1/lesson-1-3-supervised-risk.png\n")
cat("2. public/ml-biostatistics/figures/module-1/lesson-1-3-unsupervised-clusters.png\n")
cat("3. public/ml-biostatistics/figures/module-1/lesson-1-3-semi-supervised-labels.png\n")
cat("4. public/ml-biostatistics/figures/module-1/lesson-1-3-learning-types.png\n\n")

# ------------------------------------------------------------
# 9. Final lesson message
# ------------------------------------------------------------

cat("============================================================\n")
cat("LESSON 1.3 COMPLETE\n")
cat("============================================================\n\n")

cat("Big idea:\n")
cat("Machine learning problems differ according to how outcome labels are used.\n\n")

cat("Supervised learning uses labelled examples to predict outcomes.\n")
cat("Unsupervised learning finds structure without using outcome labels.\n")
cat("Semi-supervised learning sits between them, using some labelled data and many unlabelled records.\n\n")

cat("In biostatistics, the learning type must match the scientific or clinical question.\n")
cat("A diabetes risk prediction model is supervised.\n")
cat("A patient subgroup discovery project is unsupervised.\n")
cat("A project with many unlabelled medical records may require semi-supervised thinking.\n\n")

