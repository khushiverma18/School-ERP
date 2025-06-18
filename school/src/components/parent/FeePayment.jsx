import React, { useState } from 'react';
import { 
  CreditCard, 
  Download, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  Receipt,
  History,
  X
} from 'lucide-react';

const FeePayment = () => {
  const [selectedFee, setSelectedFee] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [pendingFees, setPendingFees] = useState([
    {
      id: 'fee_001',
      type: 'Tuition Fee',
      amount: 1500,
      dueDate: '2024-12-15',
      description: 'Monthly tuition fee for December 2024',
      status: 'pending',
      late: false
    },
    {
      id: 'fee_002',
      type: 'Library Fee',
      amount: 50,
      dueDate: '2024-12-10',
      description: 'Annual library maintenance fee',
      status: 'pending',
      late: true
    },
    {
      id: 'fee_003',
      type: 'Sports Fee',
      amount: 200,
      dueDate: '2024-12-20',
      description: 'Quarterly sports and activities fee',
      status: 'pending',
      late: false
    }
  ]);

  const [paidFees, setPaidFees] = useState([
    {
      id: 'fee_004',
      type: 'Tuition Fee',
      amount: 1500,
      paidDate: '2024-11-15',
      transactionId: 'TXN123456789',
      description: 'Monthly tuition fee for November 2024',
      status: 'paid'
    },
    {
      id: 'fee_005',
      type: 'Exam Fee',
      amount: 100,
      paidDate: '2024-10-25',
      transactionId: 'TXN123456788',
      description: 'Mid-term examination fee',
      status: 'paid'
    },
    {
      id: 'fee_006',
      type: 'Transportation Fee',
      amount: 300,
      paidDate: '2024-10-01',
      transactionId: 'TXN123456787',
      description: 'Monthly bus transportation fee',
      status: 'paid'
    }
  ]);

  const handlePayNow = (fee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // Mock Razorpay payment processing
    const options = {
      key: 'rzp_test_eThLGW3Me5FJvr',
      amount: selectedFee.amount * 100, // Amount in paise
      currency: 'USD',
      name: 'Pragyan AI',
      description: selectedFee.description,
      handler: function(response) {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        
        // Move fee from pending to paid
        setPendingFees(pendingFees.filter(fee => fee.id !== selectedFee.id));
        setPaidFees([{
          ...selectedFee,
          status: 'paid',
          paidDate: new Date().toISOString().split('T')[0],
          transactionId: `rzp_${Date.now()}`
        }, ...paidFees]);
        
        setShowPaymentModal(false);
        setSelectedFee(null);
      },
      prefill: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        contact: '+15551234567'
      },
      theme: {
        color: '#3B82F6'
      }
    };

    // Simulate Razorpay payment
    console.log('Processing payment with options:', options);
    
    // Simulate successful payment for demo
    setTimeout(() => {
      alert(`Payment successful! Payment ID: rzp_${Date.now()}`);
      
      // Move fee from pending to paid
      setPendingFees(pendingFees.filter(fee => fee.id !== selectedFee.id));
      setPaidFees([{
        ...selectedFee,
        status: 'paid',
        paidDate: new Date().toISOString().split('T')[0],
        transactionId: `rzp_${Date.now()}`
      }, ...paidFees]);
      
      setShowPaymentModal(false);
      setSelectedFee(null);
    }, 2000);
  };

  const downloadReceipt = (transactionId) => {
    // Mock receipt download
    alert(`Downloading receipt for transaction: ${transactionId}`);
  };

  const totalPending = pendingFees.reduce((sum, fee) => sum + fee.amount, 0);
  const totalPaid = paidFees.reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Fee Management</h1>
        
        {/* Fee Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Pending Fees</h3>
                <p className="text-2xl font-bold text-red-600">${totalPending}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Paid This Year</h3>
                <p className="text-2xl font-bold text-green-600">${totalPaid}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-semibold text-blue-900">Total Paid</h3>
                <p className="text-2xl font-bold text-blue-600">${totalPaid}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              Pending Payments
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'history'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <History className="h-4 w-4" />
              Payment History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'pending' && (
            <div className="space-y-4">
              {pendingFees.map((fee) => (
                <div key={fee.id} className={`border rounded-lg p-6 ${
                  fee.late ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{fee.type}</h3>
                        {fee.late && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            Overdue
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{fee.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Due: {new Date(fee.dueDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${fee.amount}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePayNow(fee)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <CreditCard className="h-4 w-4" />
                      Pay Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {paidFees.map((fee) => (
                <div key={fee.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{fee.type}</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Paid
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{fee.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Paid: {new Date(fee.paidDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          ${fee.amount}
                        </div>
                        <div className="flex items-center gap-1">
                          <Receipt className="h-4 w-4" />
                          {fee.transactionId}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadReceipt(fee.transactionId)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                    >
                      <Download className="h-4 w-4" />
                      Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal - Updated to match your image */}
      {showPaymentModal && selectedFee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pragyan AI</h2>
                <p className="text-gray-600 mb-6">Price Summary ${selectedFee.amount}</p>
              </div>
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <span className="text-gray-600">Using as</span>
              <span className="font-medium">+1 55512 34567</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">Us / #Rusappay</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-lg mb-4">Cards</h3>
              <p className="text-gray-600 mb-2">Payment Options</p>
              <button className="text-blue-600 font-medium">Add a new card</button>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1">Card Number</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">MM / YY</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1">C/V</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                      placeholder="CVC"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <button
                onClick={processPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeePayment;