# 00_create_shared_diabetes_dataset.R
# Machine Learning in Biostatistics
# Creates a shared diabetes prediction dataset used across the course.

# Install required packages if needed:
# install.packages(c("mlbench", "dplyr", "readr"))

library(mlbench)
library(dplyr)
library(readr)

set.seed(2026)

data("PimaIndiansDiabetes")

diabetes_data <- PimaIndiansDiabetes %>%
  mutate(
    diabetes = factor(diabetes, levels = c("neg", "pos")),
    diabetes_binary = ifelse(diabetes == "pos", 1, 0)
  )

write_csv(
  diabetes_data,
  "public/ml-biostatistics/data/shared-diabetes-prediction-data.csv"
)

cat("Shared diabetes dataset saved to public/ml-biostatistics/data/shared-diabetes-prediction-data.csv\n")
cat("Rows:", nrow(diabetes_data), "\n")
cat("Columns:", ncol(diabetes_data), "\n")
cat("Outcome distribution:\n")
print(table(diabetes_data$diabetes))
