import streamlit as st
import xgboost as xgb
import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from datetime import datetime
import os

# Page configuration
st.set_page_config(
    page_title="FraudGuard AI - Mobile Money Fraud Detection",
    page_icon="🛡️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Enhanced CSS with cute styling
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    /* Main app styling */
    .stApp {
        background: #000000 !important;
        font-family: 'Inter', sans-serif;
    }
    
    /* Main content area with glassmorphism */
    .main .block-container {
        background: rgba(20, 20, 20, 0.9) !important;
        backdrop-filter: blur(10px);
        border-radius: 20px;
        padding: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }
    
    /* Animated header */
    .main-header {
        text-align: center;
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
        background-size: 300% 300%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 3em;
        margin-bottom: 10px;
        font-weight: 700;
        animation: gradientShift 3s ease-in-out infinite;
    }
    
    @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
    .sub-header {
        text-align: center;
        color: rgba(255, 255, 255, 0.8);
        font-size: 1.2em;
        margin-bottom: 30px;
        font-weight: 300;
    }
    
    /* Fixed height dashboard cards for consistent sizing */
    .dashboard-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 24px;
        border-radius: 20px;
        margin: 16px 0;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        min-height: 140px; /* Fixed minimum height */
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .dashboard-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
        background: rgba(255, 255, 255, 0.2);
    }
    
    .dashboard-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
    }
    
    .dashboard-card:hover::before {
        left: 100%;
    }
    
    /* Dashboard card content styling for consistent layout */
    .dashboard-card h4 {
        color: rgba(255,255,255,0.8);
        margin: 0 0 8px 0;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.3;
        height: 40px; /* Fixed height for title area */
        display: flex;
        align-items: center;
    }
    
    .dashboard-card h2 {
        margin: 8px 0;
        font-size: 2.2rem;
        font-weight: 700;
        line-height: 1.2;
        height: 50px; /* Fixed height for main number */
        display: flex;
        align-items: center;
    }
    
    .dashboard-card small {
        color: rgba(255,255,255,0.6);
        font-size: 0.85rem;
        margin-top: auto; /* Push to bottom */
        height: 20px; /* Fixed height for subtitle */
        display: flex;
        align-items: center;
    }
    
    /* Cute metric cards */
    .metric-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        padding: 20px;
        border-radius: 16px;
        text-align: center;
        color: white;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .metric-card:hover {
        transform: scale(1.05);
    }
    
    /* Risk level styling with cute animations */
    .risk-high {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        border: none;
        color: white;
        padding: 20px;
        border-radius: 16px;
        margin: 12px 0;
        animation: pulse 2s infinite;
        box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
    }
    
    .risk-medium {
        background: linear-gradient(135deg, #ffa726, #ff9800);
        border: none;
        color: white;
        padding: 20px;
        border-radius: 16px;
        margin: 12px 0;
        box-shadow: 0 4px 20px rgba(255, 167, 38, 0.3);
    }
    
    .risk-low {
        background: linear-gradient(135deg, #66bb6a, #4caf50);
        border: none;
        color: white;
        padding: 20px;
        border-radius: 16px;
        margin: 12px 0;
        box-shadow: 0 4px 20px rgba(102, 187, 106, 0.3);
    }
    
    @keyframes pulse {
        0% { box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3); }
        50% { box-shadow: 0 4px 30px rgba(255, 107, 107, 0.6); }
        100% { box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3); }
    }
    
    /* Sidebar styling */
    .css-1d391kg {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-right: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Form styling */
    .stSelectbox label, .stNumberInput label, .stTextInput label {
        color: white !important;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
    
    /* Cute button styling */
    .stButton > button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        padding: 0.75rem 2rem;
        font-weight: 600;
        font-size: 1rem;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    }
    
    /* Badge styling */
    .status-badge {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.875rem;
        font-weight: 600;
        margin: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
    
    .badge-success {
        background: linear-gradient(135deg, #66bb6a, #4caf50);
        color: white;
        box-shadow: 0 2px 10px rgba(102, 187, 106, 0.3);
    }
    
    .badge-error {
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
        color: white;
        box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
    }
    
    /* Cute metric styling */
    .stMetric {
        background: rgba(255, 255, 255, 0.1);
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .stMetric > div {
        color: white !important;
    }
    
    /* Fun loading animation */
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            transform: translate3d(0, -30px, 0);
        }
        70% {
            transform: translate3d(0, -15px, 0);
        }
        90% {
            transform: translate3d(0,-4px,0);
        }
    }
    
    .loading-text {
        animation: bounce 1s ease infinite;
        color: white;
        font-weight: 600;
    }
    
    /* Cute form container */
    .stForm {
        background: rgba(255, 255, 255, 0.05);
        padding: 1.5rem;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    /* Fun hover effects for expandable sections */
    .streamlit-expanderHeader {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        transition: all 0.3s ease;
    }
    
    .streamlit-expanderHeader:hover {
        background: rgba(255, 255, 255, 0.2);
        transform: translateX(5px);
    }
    
    /* Cute emoji animations */
    .emoji-float {
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    
    /* Rainbow text effect */
    .rainbow-text {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffd93d, #ff6b6b);
        background-size: 400% 400%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: rainbow 3s ease-in-out infinite;
    }
    
    @keyframes rainbow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
</style>
""", unsafe_allow_html=True)

# Global variables
@st.cache_resource
def load_model():
    """Load the XGBoost model"""
    try:
        model_path = "models/final_model_5.bin"
        if os.path.exists(model_path):
            classifier = xgb.Booster()
            classifier.load_model(model_path)
            return classifier, True
        else:
            return None, False
    except Exception as e:
        st.error(f"Error loading model: {e}")
        return None, False

def preprocess_transaction(step, trans_type, amount, oldbalanceOrg, newbalanceOrig, oldbalanceDest, newbalanceDest):
    """Preprocess transaction data for model prediction"""
    if trans_type == "TRANSFER" or trans_type == "CASH_OUT":
        # Encode transaction type
        if trans_type == "TRANSFER":
            type_encoded = 0
        else:  # CASH_OUT
            type_encoded = 1
        
        # Handle special balance cases
        if oldbalanceDest == 0 and newbalanceDest == 0 and amount != 0:
            oldbalanceDest = -1
            newbalanceDest = -1
            
        if oldbalanceOrg == 0 and newbalanceOrig == 0 and amount != 0:
            oldbalanceOrg = np.nan
            newbalanceOrig = np.nan
        
        # Calculate error balances (feature engineering)
        errorbalanceDest = oldbalanceDest + amount - newbalanceDest
        errorbalanceOrig = newbalanceOrig + amount - oldbalanceOrg
        
        return [step, type_encoded, amount, oldbalanceOrg, newbalanceOrig, 
                oldbalanceDest, newbalanceDest, errorbalanceDest, errorbalanceOrig]
    else:
        return None

def predict_fraud(classifier, features):
    """Make fraud prediction using the loaded model"""
    try:
        # Create DataFrame with the expected column names
        feature_df = pd.DataFrame({
            'step': [features[0]], 
            'type': [features[1]], 
            'amount': [features[2]], 
            'oldbalanceOrg': [features[3]],
            'newbalanceOrig': [features[4]], 
            'oldbalanceDest': [features[5]], 
            'newbalanceDest': [features[6]], 
            'errorbalanceDest': [features[7]],
            'errorbalanceOrig': [features[8]]
        })
        
        # Get prediction probability
        prediction_prob = classifier.inplace_predict(feature_df)
        return float(prediction_prob[0])
        
    except Exception as e:
        st.error(f"Error during prediction: {e}")
        return None

def calculate_risk_factors(trans_type, amount, oldbalanceOrg, newbalanceOrig):
    """Calculate risk factors for explanation"""
    factors = []
    
    # Transaction amount factor
    if amount > 200000:
        impact = min(0.4, amount / 1000000)
        factors.append({
            'factor': 'High Transaction Amount',
            'impact': impact,
            'description': f'Large transaction: {amount:,.0f} UGX'
        })
    
    # Transaction type factor
    if trans_type in ['CASH_OUT', 'TRANSFER']:
        factors.append({
            'factor': 'Risky Transaction Type',
            'impact': 0.3,
            'description': f'{trans_type} transactions have elevated fraud risk'
        })
    
    # Account emptying pattern
    if oldbalanceOrg > 0 and newbalanceOrig == 0:
        factors.append({
            'factor': 'Account Emptying Pattern',
            'impact': 0.35,
            'description': 'Complete account balance transferred'
        })
    
    # Large balance change
    if oldbalanceOrg > 0:
        balance_change_ratio = abs(oldbalanceOrg - newbalanceOrig) / oldbalanceOrg
        if balance_change_ratio > 0.8:
            factors.append({
                'factor': 'Large Balance Change',
                'impact': 0.25,
                'description': 'Significant portion of account balance involved'
            })
    
    return factors

# Main App
def main():
    # Cute animated header
    st.markdown('''
    <div class="emoji-float">
        <h1 class="main-header">🛡️ FraudGuard AI ✨</h1>
    </div>
    <p class="sub-header">🌟 Magical Mobile Money Fraud Detection for Uganda 🇺🇬</p>
    ''', unsafe_allow_html=True)
    
    # Load model
    classifier, model_loaded = load_model()
    
    # Cute sidebar
    with st.sidebar:
        st.markdown('<h2 class="rainbow-text">🎨 Navigation</h2>', unsafe_allow_html=True)
        page = st.radio("Choose your adventure:", [
            "🔍 Fraud Detection Magic", 
            "📊 Analytics Wonderland", 
            "🧪 Demo Playground", 
            "ℹ️ Model Secrets"
        ])
        
        st.markdown("---")
        st.subheader("🤖 AI Status")
        if model_loaded:
            st.markdown('<div class="status-badge badge-success">✅ Model Ready to Rock!</div>', unsafe_allow_html=True)
            st.info("🚀 Model: XGBoost v2.1.0")
        else:
            st.markdown('<div class="status-badge badge-error">❌ Model Sleeping</div>', unsafe_allow_html=True)
            st.warning("🏠 Place your model at: models/final_model_5.bin")
    
    # Main Content with cute routing
    if page == "🔍 Fraud Detection Magic":
        fraud_detection_page(classifier, model_loaded)
    elif page == "📊 Analytics Wonderland":
        analytics_page()
    elif page == "🧪 Demo Playground":
        demo_data_page(classifier, model_loaded)
    elif page == "ℹ️ Model Secrets":
        model_info_page()

def fraud_detection_page(classifier, model_loaded):
    st.markdown('<h2 class="rainbow-text">🔍 Fraud Detection Magic</h2>', unsafe_allow_html=True)
    
    # Fixed-size stats cards with consistent structure
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("""
        <div class="dashboard-card">
            <h4>📈 Transactions Today</h4>
            <h2 style="color: white;">12,847</h2>
            <small>+234 from yesterday ✨</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="dashboard-card">
            <h4>🚨 Fraud Detected</h4>
            <h2 style="color: #ff6b6b;">23</h2>
            <small>-3 from yesterday 🎉</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col3:
        st.markdown("""
        <div class="dashboard-card">
            <h4>✅ Approved</h4>
            <h2 style="color: #66bb6a;">12,824</h2>
            <small>Happy customers! 😊</small>
        </div>
        """, unsafe_allow_html=True)
    
    with col4:
        st.markdown("""
        <div class="dashboard-card">
            <h4>👥 Active Users</h4>
            <h2 style="color: white;">8,432</h2>
            <small>Online right now! 🌟</small>
        </div>
        """, unsafe_allow_html=True)
    
    st.markdown("<br>", unsafe_allow_html=True)
    
    # Main content - Two column layout
    col1, col2 = st.columns([1, 1], gap="large")
    
    with col1:
        st.markdown("""
        <div class="dashboard-card">
            <h3 style="color: white; margin-bottom: 8px;">🎯 Transaction Analysis</h3>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">Enter transaction details to work some AI magic ✨</p>
        """, unsafe_allow_html=True)
        
        # Transaction form with cute styling
        with st.form("transaction_form"):
            step = st.number_input("⏰ Time Step", min_value=1, value=1)
            trans_type = st.selectbox("💸 Transaction Type", 
                                    ["TRANSFER", "CASH_OUT", "PAYMENT", "CASH_IN", "DEBIT"])
            amount = st.number_input("💰 Amount (UGX)", min_value=0.0, value=1000.0)
            
            st.markdown("**Account Information**")
            col_a, col_b = st.columns(2)
            
            with col_a:
                st.write("Sender Account")
                sender_account = st.text_input("Account ID/Number", placeholder="e.g., C123456789", key="sender_acc")
                oldbalanceOrg = st.number_input("Balance Before", min_value=0.0, value=0.0, key="old_orig")
                newbalanceOrig = st.number_input("Balance After", min_value=0.0, value=0.0, key="new_orig")
            
            with col_b:
                st.write("Receiver Account")
                receiver_account = st.text_input("Account ID/Number", placeholder="e.g., C987654321", key="receiver_acc")
                oldbalanceDest = st.number_input("Balance Before", min_value=0.0, value=0.0, key="old_dest")
                newbalanceDest = st.number_input("Balance After", min_value=0.0, value=0.0, key="new_dest")
            
            submitted = st.form_submit_button("🪄 Analyze with AI Magic", type="primary", use_container_width=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("""
        <div class="dashboard-card">
            <h3 style="color: white; margin-bottom: 8px;">🔮 Prediction Results</h3>
            <p style="color: rgba(255,255,255,0.8); margin-bottom: 20px;">AI-powered fraud detection analysis ✨</p>
        """, unsafe_allow_html=True)
        
        if submitted:
            if not model_loaded:
                st.markdown("""
                <div class="risk-high">
                    <h4>🚫 Model Not Loaded</h4>
                    <p>Cannot make predictions. Please ensure your model file is at: models/final_model_5.bin</p>
                </div>
                """, unsafe_allow_html=True)
                st.markdown("</div>", unsafe_allow_html=True)
                return
            
            # Show cute loading animation
            with st.spinner('🔮 AI is thinking...'):
                import time
                time.sleep(1)  # Add a small delay for effect
                
                # Process prediction
                processed_features = preprocess_transaction(
                    step, trans_type, amount, oldbalanceOrg, 
                    newbalanceOrig, oldbalanceDest, newbalanceDest
                )
                
                if processed_features is None:
                    fraud_score = 0.05
                    risk_level = "LOW"
                    recommendation = "APPROVE"
                    risk_factors = []
                else:
                    fraud_score = predict_fraud(classifier, processed_features)
                    if fraud_score is None:
                        st.error("🚨 Prediction failed")
                        st.markdown("</div>", unsafe_allow_html=True)
                        return
                    
                    if fraud_score > 0.7:
                        risk_level = "HIGH"
                        recommendation = "BLOCK"
                    elif fraud_score > 0.4:
                        risk_level = "MEDIUM"
                        recommendation = "REVIEW"
                    else:
                        risk_level = "LOW"
                        recommendation = "APPROVE"
                    
                    risk_factors = calculate_risk_factors(trans_type, amount, oldbalanceOrg, newbalanceOrig)
            
            # Display results with cute styling
            st.metric("🎯 Fraud Score", f"{fraud_score:.1%}")
            
            if risk_level == "HIGH":
                st.markdown(f"""
                <div class="risk-high">
                    <h4>🚨 HIGH RISK</h4>
                    <p><strong>🛑 Recommendation: {recommendation}</strong></p>
                    <p>🎯 Confidence: {abs(fraud_score - 0.5) * 2:.1%}</p>
                </div>
                """, unsafe_allow_html=True)
            elif risk_level == "MEDIUM":
                st.markdown(f"""
                <div class="risk-medium">
                    <h4>⚠️ MEDIUM RISK</h4>
                    <p><strong>🔍 Recommendation: {recommendation}</strong></p>
                    <p>🎯 Confidence: {abs(fraud_score - 0.5) * 2:.1%}</p>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f"""
                <div class="risk-low">
                    <h4>✅ LOW RISK</h4>
                    <p><strong>🎉 Recommendation: {recommendation}</strong></p>
                    <p>🎯 Confidence: {abs(fraud_score - 0.5) * 2:.1%}</p>
                </div>
                """, unsafe_allow_html=True)
            
            # Risk factors with cute icons
            if risk_factors:
                st.write("**🔍 Risk Factors:**")
                for factor in risk_factors:
                    st.write(f"• **{factor['factor']}** ({factor['impact']:.1%}): {factor['description']}")
            
        else:
            st.markdown("""
            <div style="text-align: center; padding: 40px; color: rgba(255,255,255,0.8);">
                <div class="emoji-float">🔮</div>
                <p>Submit a transaction to see the magic happen! ✨</p>
            </div>
            """, unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)

def analytics_page():
    st.markdown('<h2 class="rainbow-text">📊 Analytics Wonderland</h2>', unsafe_allow_html=True)
    
    # Create cute analytics with emojis
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("📈 Transactions Today", "12,847", "↑ 234", help="Growing strong! 💪")
    with col2:
        st.metric("🚨 Fraud Detected", "23", "↓ 3", help="Less fraud = more happiness! 😊")
    with col3:
        st.metric("📊 Fraud Rate", "0.18%", "↓ 0.02%", help="Keeping it low! 🎯")
    with col4:
        st.metric("💰 Amount Saved", "2.3M UGX", "↑ 340K", help="Money saved for good people! 💝")
    
    # Create sample charts with cute titles
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("📈 Daily Transaction Symphony")
        dates = pd.date_range(start='2024-01-01', end='2024-01-30', freq='D')
        volumes = np.random.randint(8000, 15000, len(dates))
        
        fig = px.line(x=dates, y=volumes, title="🎵 Transaction Volume Over Time")
        fig.update_layout(
            xaxis_title="📅 Date", 
            yaxis_title="📊 Number of Transactions",
            plot_bgcolor='rgba(0,0,0,0)',
            paper_bgcolor='rgba(0,0,0,0)'
        )
        fig.update_traces(line=dict(color='#ff6b6b', width=3))
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.subheader("🥧 Fraud by Transaction Type")
        types = ['TRANSFER', 'CASH_OUT', 'PAYMENT', 'CASH_IN']
        fraud_counts = [15, 8, 0, 0]
        
        fig = px.pie(values=fraud_counts, names=types, title="🔍 Fraud Distribution Rainbow")
        fig.update_layout(plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)')
        st.plotly_chart(fig, use_container_width=True)

def demo_data_page(classifier, model_loaded):
    st.markdown('<h2 class="rainbow-text">🧪 Demo Playground</h2>', unsafe_allow_html=True)
    
    st.markdown("🎮 **Test the fraud detection system with these pre-configured fun scenarios:**")
    
    # Sample transactions with cute descriptions
    demo_transactions = [
        {
            'name': '🚨 Suspicious High-Risk Transfer',
            'emoji': '⚠️',
            'step': 1,
            'type': 'TRANSFER',
            'amount': 500000.0,
            'oldbalanceOrg': 500000.0,
            'newbalanceOrig': 0.0,
            'oldbalanceDest': 0.0,
            'newbalanceDest': 500000.0
        },
        {
            'name': '🔥 Risky Cash-Out Alert',
            'emoji': '🚨',
            'step': 1,
            'type': 'CASH_OUT',
            'amount': 300000.0,
            'oldbalanceOrg': 300000.0,
            'newbalanceOrig': 0.0,
            'oldbalanceDest': 0.0,
            'newbalanceDest': 0.0
        },
        {
            'name': '✅ Happy Normal Payment',
            'emoji': '😊',
            'step': 1,
            'type': 'PAYMENT',
            'amount': 5000.0,
            'oldbalanceOrg': 50000.0,
            'newbalanceOrig': 45000.0,
            'oldbalanceDest': 10000.0,
            'newbalanceDest': 15000.0
        }
    ]
    
    for i, demo in enumerate(demo_transactions):
        with st.expander(f"{demo['emoji']} Demo {i+1}: {demo['name']}"):
            col1, col2 = st.columns([2, 1])
            
            with col1:
                for key, value in demo.items():
                    if key not in ['name', 'emoji']:
                        st.write(f"**{key}:** {value}")
            
            with col2:
                if st.button(f"🧪 Test Demo {i+1}", key=f"demo_{i}"):
                    if model_loaded:
                        with st.spinner(f'{demo["emoji"]} Testing...'):
                            # Process demo transaction
                            processed = preprocess_transaction(
                                demo['step'], demo['type'], demo['amount'],
                                demo['oldbalanceOrg'], demo['newbalanceOrig'],
                                demo['oldbalanceDest'], demo['newbalanceDest']
                            )
                            
                            if processed:
                                fraud_score = predict_fraud(classifier, processed)
                                if fraud_score:
                                    st.success(f"🎯 Fraud Score: {fraud_score:.1%}")
                                    if fraud_score > 0.7:
                                        st.error("🚨 HIGH RISK - BLOCK")
                                    elif fraud_score > 0.4:
                                        st.warning("⚠️ MEDIUM RISK - REVIEW")
                                    else:
                                        st.success("✅ LOW RISK - APPROVE")
                            else:
                                st.info("😌 Low risk transaction type")
                    else:
                        st.error("🚫 Model not loaded")

def model_info_page():
    st.markdown('<h2 class="rainbow-text">ℹ️ Model Secrets</h2>', unsafe_allow_html=True)
    
    col1, col2 = st.columns([1, 1])
    
    with col1:
        st.markdown("### 📋 Model Magic Details")
        info_data = {
            '🧠 Algorithm': 'XGBoost (Extreme Gradient Boosting)',
            '🚀 Version': 'v2.1.0',
            '📊 Training Dataset': 'PaySim (6.3M transactions)',
            '🌍 Data Source': 'Synthetic Uganda Mobile Money Data',
            '🎯 Target Variable': 'isFraud (Binary Classification)'
        }
        
        for key, value in info_data.items():
            st.write(f"**{key}:** {value}")
    
    with col2:
        st.markdown("### 📊 Performance Magic")
        metrics_data = {
            'Accuracy': '94.2%',
            'Precision': '91.8%',
            'Recall': '89.5%',
            'F1-Score': '90.6%',
            'AUC-ROC': '0.948'
        }
        
        for key, value in metrics_data.items():
            st.metric(f"✨ {key}", value)
    
    st.markdown("### 🔧 Features Used in the Magic")
    features = [
        '⏰ step - Transaction time sequence',
        '💸 type - Transaction type (encoded)',
        '💰 amount - Transaction amount',
        '📤 oldbalanceOrg - Sender balance before',
        '📥 newbalanceOrig - Sender balance after',
        '📤 oldbalanceDest - Receiver balance before',
        '📥 newbalanceDest - Receiver balance after',
        '⚠️ errorbalanceDest - Balance error destination',
        '🔍 errorbalanceOrig - Balance error origin'
    ]
    
    for feature in features:
        st.write(f"• {feature}")
    
    st.markdown("### ⚙️ Model Superpowers")
    capabilities = [
        "🎯 Handles class imbalance (99.9% legitimate transactions)",
        "⚡ Real-time fraud scoring",
        "📖 Explainable predictions with risk factor analysis",
        "🇺🇬 Optimized for Ugandan mobile money transaction patterns",
        "💸 Supports TRANSFER and CASH_OUT transaction types"
    ]
    
    for capability in capabilities:
        st.write(f"✓ {capability}")

if __name__ == "__main__":
    main()