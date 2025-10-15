# 🛡️ Picket AI - Mobile Money Fraud Detection

> **AI-powered fraud detection for Uganda's mobile money ecosystem**

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![Streamlit](https://img.shields.io/badge/Streamlit-1.28+-red.svg)
![XGBoost](https://img.shields.io/badge/XGBoost-2.0+-green.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

##  Overview

Picket AI is a cutting-edge fraud detection system built specifically for Sub-Saharan African mobile money transactions. Using advanced machine learning and real-time confidence scoring, it helps financial institutions identify and prevent fraudulent transactions before they occur.

###  Key Features

- ** Real-Time Fraud Detection** - Instant analysis of mobile money transactions
- ** Advanced Confidence Scoring** - Multi-method confidence evaluation using:
  - Probability distance analysis
  - Tree variance measurement
  - Feature sensitivity testing
  - Ensemble consistency checks
- ** Interactive Dashboard** - Beautiful, user-friendly interface with real-time analytics
- ** Explainable AI** - Clear risk factor breakdowns and human-readable recommendations
- ** Comprehensive Analytics** - Deep insights into fraud patterns and transaction trends
- ** Demo Playground** - Pre-loaded test scenarios for quick evaluation

## Google collab notebook
https://colab.research.google.com/drive/13NNl-Zhhmm2KLV074jGpUuPMrkrC0sci?authuser=2#scrollTo=20D_CpexjHVo

##  Quick Start

### Prerequisites

```bash
Python 3.8 or higher
pip package manager
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MarthaKJ/Pickel-AI.git
cd Streamlit
```

2. **Install dependencies**
```bash
pip install 
```

3. **Set up your model**
   
   Place your trained XGBoost model at:
   ```
   models/3momtsim_fraud_model.bin
   ```

4. **Run the application**
```bash
streamlit run app.py
```

5. **Open your browser**
   
   Navigate to `http://localhost:8501`

##  Dependencies

```txt
streamlit>=1.28.0
xgboost>=2.0.0
numpy>=1.24.0
pandas>=2.0.0
plotly>=5.17.0
```

##  Project Structure

```
streamlit/
├── app.py                          # Main Streamlit application
├── models/
│   └── 3momtsim_fraud_model.bin   # Trained XGBoost model
├── requirements.txt                # Python dependencies
├── README.md                       # This file
└── .gitignore                      # Git ignore rules
```

##  Usage Guide

### 1. Fraud Detection

The main interface for analyzing transactions:

- **Select transaction type** (DEPOSIT, WITHDRAWAL, TRANSFER, PAYMENT, DEBIT)
- **Enter transaction amount** in Ugandan Shillings (UGX)
- **Provide account details** for both initiator and recipient
- **Click "Analyze with AI Magic"** to get instant results

### 2. Results Interpretation

The system provides:
- **Fraud Score** (0-100%): Probability of fraud
- **Confidence Score** (0-100%): Model's certainty level
- **Risk Assessment**: LOW, MEDIUM, or HIGH
- **Recommendation**: APPROVE, REVIEW, or BLOCK
- **Friendly AI Explanation**: Human-readable analysis

### 3. Confidence Thresholds

```
High Confidence (≥70%):  Automatic decision recommended
Medium (45-70%):         Consider additional monitoring
Low (<45%):              Human review required
```

### 4. Analytics Wonderland

Explore comprehensive fraud statistics:
- Transaction type distributions
- Fraud rate analysis
- Amount pattern insights
- Temporal fraud evolution
- Dataset coverage metrics

### 5. Demo Playground

Test with pre-configured scenarios:
- **Suspicious High-Risk Transfer**: Known fraud pattern
- **Risky Withdrawal Alert**: Account emptying behavior
- **Happy Normal Payment**: Legitimate transaction baseline

##  Model Details

### Dataset: MomtSim

Picket AI is built on the **MomtSim dataset**, a groundbreaking mobile money fraud dataset created by researchers from **Makerere University, Uganda**:

- ** Researchers**: Mr. Denish Azamuke, Dr. Marriette Katarahweire, Engineer Bainomugisha
- ** Focus**: Sub-Saharan African mobile money ecosystems
- ** Size**: 1.72 million transactions across 144 time steps
- ** Fraud Rate**: 10.2% overall (30.8% in TRANSFER transactions)

### Model Performance

| Metric | Score |
|--------|-------|
| **AUC-ROC** | 89.9% |
| **Precision** | 81% |
| **Recall** | 89% |
| **F1-Score** | 85% |

### Feature Engineering

The model uses 45 engineered features including:
- **Core features**: Transaction type, amount, account balances
- **Error features**: Balance discrepancy detection
- **Network features**: Account relationship patterns
- **Temporal features**: Time-based fraud indicators
- **Risk features**: Statistical anomaly scores

##  Key Insights

### Critical Findings from MomtSim Data

1. ** Fraud Concentration**: ALL fraud occurs in TRANSFER transactions (30.8% fraud rate)
2. ** Safe Types**: PAYMENT, DEPOSIT, WITHDRAWAL, DEBIT have 0% fraud
3. ** Amount Pattern**: Fraudulent transactions average 2.2x smaller than legitimate ones
4. ** Temporal Volatility**: Fraud rates vary from 4% to 18% across time steps
5. ** Class Balance**: 8.85x weight applied to fraud class during training

##  Technical Architecture

### Multi-Layered Feature Engineering Pipeline

Our fraud detection system employs a sophisticated 5-layer feature engineering approach that creates **45+ engineered features** from raw transaction data:

#### 1️Base Features (13 features)
- **Amount transformations**: Log-scaled amounts to handle skewed distributions
- **Balance changes**: Tracking sender/recipient balance deltas
- **Balance anomalies**: Detecting mathematical inconsistencies in balance updates
- **Amount ratios**: Transaction amount relative to account balances
- **Transaction type encoding**: Categorical → numerical mapping

```python
# Example: Balance error detection
balance_error_sender = |oldBalance + change - newBalance|
has_balance_error = (sender_error > 0) OR (recipient_error > 0)
```

#### 2️ Temporal Patterns (8 features)
- **Cyclical time features**: Hour of day, day of week patterns
- **Periodic encoding**: Sine/cosine transformations for time cyclicality
- **Risk windows**: Night transactions (10pm-6am), weekend activity
- **Time-based signals**: Capturing fraud patterns across 144 time steps

```python
# Cyclical encoding preserves periodicity
hour_sin = sin(2π × hour / 24)
hour_cos = cos(2π × hour / 24)
```

#### 3️ Network Graph Features (7 features)
- **Relationship mapping**: Unique counterparty counts per user
- **Interaction frequency**: Sender-recipient pair transaction history
- **First-time interactions**: Detecting novel relationships (fraud indicator)
- **Network centrality**: User importance within transaction network

```python
# Network centrality proxy
sender_centrality = unique_recipients / max_recipients
is_first_interaction = (pair_count == 1)
```

#### 4️ User Behavior Aggregations (17 features)
**Leakage-free temporal aggregations** using only past data:
- **Cumulative counters**: Progressive transaction counts per user
- **Expanding statistics**: Mean, std, max of historical amounts
- **Z-score analysis**: Current transaction vs. user's historical pattern
- **Velocity features**: Transaction frequency over 5/10/20 step windows
- **Burst detection**: Multiple transactions in rapid succession

```python
# Example: Amount anomaly detection
user_amount_zscore = (current_amount - user_avg_amount) / user_std_amount
is_burst = (time_since_last_transaction < 1)
```

#### 5️ Interaction & Non-Linear Features
- **Cross-feature interactions**: velocity × amount, balance ratios
- **Polynomial features**: Squared terms for non-linear patterns
- **Ratio comparisons**: Sender vs recipient balance dynamics


Confidence Scoring System

### Confidence Scoring System

Our unique multi-method confidence evaluation:

```python
Confidence = 0.3 × Probability_Distance +
             0.25 × Tree_Variance +
             0.25 × Sensitivity_Score +
             0.2 × Ensemble_Consistency
```

### Decision Logic

```
IF confidence < 70%:
    IF fraud_score > 30%: BLOCK (low confidence safety)
    ELSE: HUMAN_REVIEW_REQUIRED
ELSE:
    IF fraud_score < 40%: APPROVE
    ELIF fraud_score < 70%: REVIEW
    ELSE: BLOCK
```

##  Why Picket AI?

### Built for Africa, By Africans

- **Localized Data**: Trained on authentic African mobile money patterns
- **Cultural Context**: Understands regional transaction behaviors
- **First-of-its-Kind**: No existing ML baselines for MomtSim dataset
- **Open Innovation**: Enabling broader AI research across Africa

### Innovation Highlights

1. **Pioneer Implementation**: First end-to-end AI system on MomtSim
2. **Explainable Predictions**: Not just scores, but actionable insights
3. **Real Confidence Metrics**: Genuine model uncertainty quantification
4. **Beautiful UX**: Modern, intuitive interface inspired by contemporary design

##  API Reference

### Core Functions

```python
# Load the trained model
classifier, model_loaded = load_model()

# Preprocess transaction data
features = preprocess_transaction(
    step, transaction_type, amount, 
    initiator, oldBalInitiator, newBalInitiator,
    recipient, oldBalRecipient, newBalRecipient
)

# Get prediction with confidence
fraud_score, confidence, method, breakdown = predict_fraud_with_confidence(
    classifier, features
)
```

##  Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Areas for Contribution

- Additional fraud detection algorithms
- Enhanced visualization features
- API integration capabilities
- Mobile app development
- Documentation improvements
- Performance optimization

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

### Dataset Authors

Special thanks to the researchers who created the MomtSim dataset:
- **Mr. Denish Azamuke** - Makerere University
- **Dr. Marriette Katarahweire** - Makerere University
- **Engineer Bainomugisha** - Makerere University

Their pioneering work has enabled AI innovation and capacity building in fraud detection research across Africa.

### Technologies

- **Streamlit** - Interactive web application framework
- **XGBoost** - Gradient boosting machine learning
- **Plotly** - Beautiful interactive visualizations
- **Pandas & NumPy** - Data processing powerhouses

##  Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/picket-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/picket-ai/discussions)
- **Email**: your.email@example.com


##  Performance Benchmarks

| Model | AUC-ROC | Precision | Recall | F1-Score |
|-------|---------|-----------|--------|----------|
| **XGBoost** | 88.51% | 79% | 87% | 83% |
| **LightGBM** | 88.52% | 80% | 88% | 84% |
| **CatBoost** | 88.50% | 79% | 87% | 83% |
| **Stacking** | **89.41%** | **81%** | **89%** | **85%** |

---

<div align="center">

**Built with ❤️ for African Fintech**

*Empowering secure mobile money transactions across Sub-Saharan Africa*

</div>





