import { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  Box
} from '@mui/material';

const Tab4MainPage = () => {
  // State for form fields (each yes/no question stored as a string "yes" or "no")
  const [formData, setFormData] = useState({
    refundPolicy: '',
    refundPolicyYes: '',
    trackRecords: '',
    trackRecordsYes: '',
    verifyAuthenticity: '',
    verifyAuthenticityYes: '',
    recognizableNameYes: '',
    fraudDetection: '',
    fraudDetectionYes: '',
    complaintsProcess: '',
    complaintsProcessYes: '',
    trackingInfoYes: '',
    customerSupport: '',
    customerSupportYes: '',
    paymentProcessorYes: ''
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Count yes responses from all yes/no toggle fields
    const yesKeys = [
      'refundPolicyYes',
      'trackRecordsYes',
      'verifyAuthenticityYes',
      'recognizableNameYes',
      'fraudDetectionYes',
      'complaintsProcessYes',
      'trackingInfoYes',
      'customerSupportYes',
      'paymentProcessorYes'
    ];
    let yesCount = 0;
    yesKeys.forEach(key => {
      if (formData[key] === 'yes') {
        yesCount++;
      }
    });

    let analysisTitle = '';
    let analysisMessage = '';

    if (yesCount >= 8) {
      analysisTitle = 'Low Risk of Chargebacks';
      analysisMessage =
        'Your business and policies are well protected. There’s always more you could be doing and Pie Pay can help you stay as safe as possible. Schedule a meeting with us to learn more.';
    } else if (yesCount >= 5 && yesCount <= 7) {
      analysisTitle = 'Some Risk of Chargebacks';
      analysisMessage =
        'Your business carries some risk of chargebacks and needs updates to its policies and processor protections. Schedule a meeting with us to learn more.';
    } else if (yesCount >= 3 && yesCount <= 4) {
      analysisTitle = 'Moderate risk of chargebacks';
      analysisMessage =
        'Your business has a moderate to high risk of chargebacks and needs immediate updates to its policies, procedures and processor. Schedule a meeting with us to learn more.';
    } else {
      analysisTitle = 'High Risk of chargebacks';
      analysisMessage =
        'Your business has a very high risk of chargebacks and is open to fraud from customers. You need an immediate assessment of your policies and procedures to protect your business processing from chargeback fraud. Schedule a meeting with us to learn more.';
    }

    setResult({
      yesCount,
      analysisTitle,
      analysisMessage
    });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Chargeback Risk Assessment
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* 1. Refund, Return, and Shipping Policies */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              1. Refund, Return, and Shipping Policies
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Are these clearly stated and easily accessible to customers? Do you have full policies in place posted where customers can access them?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="refundPolicyYes" value={formData.refundPolicyYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="refundPolicy"
              label="Describe your policies"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.refundPolicy}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 2. Tracking and Maintaining Records of Transactions */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              2. Tracking and Maintaining Records of Transactions
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Do you keep detailed documentation, including order details, communications, and proof of delivery?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="trackRecordsYes" value={formData.trackRecordsYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="trackRecords"
              label="Describe your record keeping process"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.trackRecords}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 3. Verification of Customer Transactions */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              3. Verification of Customer Transactions
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Do you utilize tools like address verification, CVV codes, or 3D Secure for online payments?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="verifyAuthenticityYes" value={formData.verifyAuthenticityYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="verifyAuthenticity"
              label="Describe the methods used"
              variant="outlined"
              fullWidth
              value={formData.verifyAuthenticity}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 4. Recognizable Business Name on Credit Card Statements */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              4. Recognizable Business Name on Credit Card Statements
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Does your billing descriptor match what customers will expect to see on their credit card statements?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="recognizableNameYes" value={formData.recognizableNameYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* 5. Identification of Fraudulent or Suspicious Transactions */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              5. Identification of Fraudulent or Suspicious Transactions
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Do you have automated systems or manual checks in place to flag high-risk orders?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="fraudDetectionYes" value={formData.fraudDetectionYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="fraudDetection"
              label="Describe how you identify suspicious transactions (optional)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.fraudDetection}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 6. Handling Customer Complaints or Disputes */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              6. Handling Customer Complaints or Disputes
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Do you offer prompt resolutions, such as refunds or exchanges, before issues escalate into chargebacks?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="complaintsProcessYes" value={formData.complaintsProcessYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="complaintsProcess"
              label="Describe your process"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.complaintsProcess}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 7. Tracking Information and Delivery Confirmations */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              7. Tracking Information and Delivery Confirmations
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Is the customer sent tracking numbers, and can you provide proof of delivery in case of disputes?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="trackingInfoYes" value={formData.trackingInfoYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* 8. Accessibility of Customer Support */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              8. Accessibility of Customer Support
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Can customers easily reach you through phone, email, or live chat if they have concerns about their order?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="customerSupportYes" value={formData.customerSupportYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <TextField
              name="customerSupport"
              label="Describe your customer support availability"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formData.customerSupport}
              onChange={handleChange}
              sx={{ mt: 2 }}
            />
          </CardContent>
        </Card>

        {/* 9. Payment Processor and Fraud Protection Tools */}
        <Card variant="outlined" sx={{ my: 2, p: 2 }}>
          <CardContent>
            <Typography variant="h6">
              9. Payment Processor and Fraud Protection Tools
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Are you using services that help detect and prevent fraudulent transactions and assist in handling disputes?
            </Typography>
            <FormControl component="fieldset" sx={{ mt: 1 }}>
              <RadioGroup row name="paymentProcessorYes" value={formData.paymentProcessorYes} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" type="submit">
            Submit Assessment
          </Button>
        </Box>
      </form>

      {result && (
        <Card variant="outlined" sx={{ my: 4, p: 2, backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Analysis Result
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {result.analysisTitle} ({result.yesCount} Yes answer{result.yesCount !== 1 ? 's' : ''})
            </Typography>
            <Typography variant="body1" gutterBottom>
              {result.analysisMessage}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6">In the meantime:</Typography>
              <ul>
                <li>Use Clear and Transparent Policies</li>
                <li>Maintain Detailed Transaction Records</li>
                <li>Implement Address Verification Systems (AVS)</li>
                <li>Require Strong Authentication Methods</li>
                <li>Use a Clear and Recognizable Billing Descriptor</li>
                <li>Monitor and Flag Suspicious Transactions</li>
                <li>Respond Promptly to Customer Complaints</li>
                <li>Send Tracking Information and Delivery Confirmations</li>
                <li>Work with Your Payment Processor</li>
                <li>Offer Customer Support Accessibility</li>
              </ul>
              <Typography variant="body2">
                By taking these precautions, you can reduce the likelihood of chargebacks and protect your business from unnecessary financial losses.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Tab4MainPage;
