import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    experienceLevel: '',
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});

  const experienceLevels = [
    { value: 'beginner', label: 'Beginner (0-30 WPM)' },
    { value: 'intermediate', label: 'Intermediate (30-60 WPM)' },
    { value: 'advanced', label: 'Advanced (60-90 WPM)' },
    { value: 'expert', label: 'Expert (90+ WPM)' }
  ];

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    const newValidationStatus = { ...validationStatus };

    switch (name) {
      case 'username':
        if (!value) {
          newErrors.username = 'Username is required';
          newValidationStatus.username = 'error';
        } else if (value?.length < 3) {
          newErrors.username = 'Username must be at least 3 characters';
          newValidationStatus.username = 'error';
        } else if (!/^[a-zA-Z0-9_]+$/?.test(value)) {
          newErrors.username = 'Username can only contain letters, numbers, and underscores';
          newValidationStatus.username = 'error';
        } else {
          delete newErrors?.username;
          newValidationStatus.username = 'success';
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          newErrors.email = 'Email is required';
          newValidationStatus.email = 'error';
        } else if (!emailRegex?.test(value)) {
          newErrors.email = 'Please enter a valid email address';
          newValidationStatus.email = 'error';
        } else {
          delete newErrors?.email;
          newValidationStatus.email = 'success';
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
          newValidationStatus.password = 'error';
        } else if (value?.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
          newValidationStatus.password = 'error';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(value)) {
          newErrors.password = 'Password must contain uppercase, lowercase, and number';
          newValidationStatus.password = 'error';
        } else {
          delete newErrors?.password;
          newValidationStatus.password = 'success';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
          newValidationStatus.confirmPassword = 'error';
        } else if (value !== formData?.password) {
          newErrors.confirmPassword = 'Passwords do not match';
          newValidationStatus.confirmPassword = 'error';
        } else {
          delete newErrors?.confirmPassword;
          newValidationStatus.confirmPassword = 'success';
        }
        break;

      case 'agreeToTerms':
        if (!value) {
          newErrors.agreeToTerms = 'You must agree to the terms of service';
        } else {
          delete newErrors?.agreeToTerms;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
    setValidationStatus(newValidationStatus);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    validateField(name, fieldValue);
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      experienceLevel: value
    }));
  };

  const isFormValid = () => {
    return (formData?.username &&
    formData?.email &&
    formData?.password &&
    formData?.confirmPassword &&
    formData?.agreeToTerms && Object.keys(errors)?.length === 0);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate all fields
    Object.keys(formData)?.forEach(key => {
      validateField(key, formData?.[key]);
    });

    if (!isFormValid()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock successful registration
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', formData?.username);

      // Navigate to typing test interface
      navigate('/typing-test-interface');
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getValidationIcon = (field) => {
    if (validationStatus?.[field] === 'success') {
      return <Icon name="CheckCircle" size={20} className="text-success" />;
    } else if (validationStatus?.[field] === 'error') {
      return <Icon name="XCircle" size={20} className="text-error" />;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Username */}
      <div className="relative">
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          className="pr-10"
        />
        <div className="absolute right-3 top-9">
          {getValidationIcon('username')}
        </div>
      </div>
      {/* Display Name (Optional) */}
      <div>
        <Input
          label="Display Name"
          type="text"
          name="displayName"
          placeholder="Enter your display name (optional)"
          value={formData?.displayName}
          onChange={handleInputChange}
          description="This name will be shown on leaderboards"
        />
      </div>
      {/* Email */}
      <div className="relative">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email address"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          className="pr-10"
        />
        <div className="absolute right-3 top-9">
          {getValidationIcon('email')}
        </div>
      </div>
      {/* Experience Level */}
      <div>
        <Select
          label="Typing Experience Level"
          placeholder="Select your current typing level"
          options={experienceLevels}
          value={formData?.experienceLevel}
          onChange={handleSelectChange}
          description="This helps us customize your experience"
        />
      </div>
      {/* Password */}
      <div className="relative">
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="pr-10"
        />
        <div className="absolute right-3 top-9">
          {getValidationIcon('password')}
        </div>
      </div>
      {/* Confirm Password */}
      <div className="relative">
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          className="pr-10"
        />
        <div className="absolute right-3 top-9">
          {getValidationIcon('confirmPassword')}
        </div>
      </div>
      {/* Terms Agreement */}
      <div>
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          required
        />
      </div>
      {/* Submit Error */}
      {errors?.submit && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <p className="text-sm text-error">{errors?.submit}</p>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={!isFormValid()}
        iconName="UserPlus"
        iconPosition="left"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegistrationForm;