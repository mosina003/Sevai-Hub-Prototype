'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const services = {
  certificates: [
    {
      id: 'cert-001',
      name: 'Birth Certificate',
      description: 'Apply for birth registration certificate',
      icon: '👶',
      processingTime: '7 Days',
      department: 'Revenue Department',
      fee: 'Free',
      requiredFields: ['fullName', 'dateOfBirth', 'fatherName', 'motherName', 'placeOfBirth'],
      detailedDescription: 'A birth certificate is an official document that records the birth of a child. It is essential for admission to school, passport, and other government services.',
      documents: ['Hospital discharge papers', 'Parent ID proof', 'Address proof', 'Marriage certificate (if applicable)'],
      eligibility: ['Indian citizen', 'Birth should be registered within 30 days'],
      benefits: ['Proof of identity and age', 'Required for school admission', 'Needed for passport application', 'Essential for employment'],
      steps: ['Register online through this portal', 'Fill in required details', 'Submit supporting documents', 'Verification by local officer', 'Certificate issuance']
    },
    {
      id: 'cert-002',
      name: 'Income Certificate',
      description: 'Apply for income verification certificate',
      icon: '📋',
      processingTime: '10 Days',
      department: 'Revenue Department',
      fee: '₹100',
      requiredFields: ['fullName', 'fatherName', 'occupation', 'annualIncome', 'address'],
      detailedDescription: 'Income certificate is an official document that certifies the annual income of an individual. It is used for various government schemes and financial transactions.',
      documents: ['ITR or salary slips', 'Pan card', 'Aadhaar card', 'Employment letter', 'Bank statements'],
      eligibility: ['Indian citizen', 'Permanent resident of the state', 'Age 18 or above'],
      benefits: ['Avail government schemes', 'Bank loans and scholarships', 'Educational grants', 'Employment verification'],
      steps: ['Apply online with income details', 'Upload income proof documents', 'Verification by revenue officer', 'Certificate generation', 'Download and collect']
    },
    {
      id: 'cert-003',
      name: 'Community Certificate',
      description: 'Apply for community certificate',
      icon: '👥',
      processingTime: '5 Days',
      department: 'Revenue Department',
      fee: 'Free',
      requiredFields: ['fullName', 'fatherName', 'community', 'address', 'yearOfResidence'],
      detailedDescription: 'Community certificate officially verifies the community status of an individual. It is required for availing community-specific benefits and reservations.',
      documents: ['Caste certificate (if issued)', 'ID proof', 'Address proof', 'Ration card', 'School leaving certificate'],
      eligibility: ['Indian citizen', 'Permanent resident', 'Community details verification'],
      benefits: ['Avail SC/ST/OBC reservations', 'Government scholarships', 'Job reservations', 'Admission benefits'],
      steps: ['Fill application form with community details', 'Submit required documents', 'Officer verification', 'Certificate issuance', 'Digital download']
    },
    {
      id: 'cert-004',
      name: 'Nativity Certificate',
      description: 'Apply for nativity proof',
      icon: '🏠',
      processingTime: '7 Days',
      department: 'Revenue Department',
      fee: 'Free',
      requiredFields: ['fullName', 'fatherName', 'nativePlace', 'address', 'yearOfBirth'],
      detailedDescription: 'Nativity certificate is proof of native place of birth. It is essential for government jobs and educational admissions.',
      documents: ['Birth certificate', 'ID proof', 'Residential address proof', 'Parents ID proof', 'School certificates'],
      eligibility: ['Indian citizen', 'Birth proof in the state', 'Continuous residence of parents'],
      benefits: ['Native preference in jobs', 'Educational admission benefits', 'State scholarship eligibility', 'Domicile benefits'],
      steps: ['Apply with nativity details', 'Provide birth and residence proof', 'Verification by local officer', 'Certificate generation', 'Download certificate']
    },
  ],
  transport: [
    {
      id: 'trans-001',
      name: 'Driving License',
      description: 'Apply for driving license',
      icon: '🚗',
      processingTime: '15 Days',
      department: 'Transport Department',
      fee: '₹200',
      requiredFields: ['fullName', 'dateOfBirth', 'address', 'mobileNumber', 'licenseType'],
      detailedDescription: 'A driving license is an official document permitting a person to operate motor vehicles. Categories include 2-wheeler, 4-wheeler, heavy vehicles, etc.',
      documents: ['Age proof (birth certificate/passport)', 'Address proof', 'Medical fitness certificate', 'Learner license', 'Passport size photos'],
      eligibility: ['Minimum 18 years for 4-wheeler', 'Must have learner license', 'Physically fit and sound health', 'Pass written and driving test'],
      benefits: ['Legal permission to drive', 'International driving permit', 'Employment opportunities', 'Vehicle ownership verification'],
      steps: ['Complete DL test at RTO', 'Medical checkup', 'Written examination', 'Practical driving test', 'License issuance']
    },
    {
      id: 'trans-002',
      name: "Learner's License",
      description: "Apply for learner's license",
      icon: '🎯',
      processingTime: '3 Days',
      department: 'Transport Department',
      fee: '₹50',
      requiredFields: ['fullName', 'dateOfBirth', 'address', 'mobileNumber', 'licenseType'],
      detailedDescription: 'Learner license allows beginners to learn driving under supervision. It is mandatory before applying for permanent driving license.',
      documents: ['Age proof', 'Address proof', 'ID proof', 'Passport size photos', 'Medical certificate'],
      eligibility: ['Minimum 16 years for 2-wheeler', 'Minimum 18 years for 4-wheeler', 'Pass written test', 'Fit driving health'],
      benefits: ['Learn to drive legally', 'Supervised driving practice', 'Foundation for permanent license', 'Insurance coverage while learning'],
      steps: ['Apply at RTO office', 'Written test on traffic rules', 'Vision and hearing test', 'Learner license issuance', 'Valid for 6 months']
    },
    {
      id: 'trans-003',
      name: 'Vehicle Registration',
      description: 'Register new vehicle',
      icon: '📝',
      processingTime: '7 Days',
      department: 'Transport Department',
      fee: '₹500',
      requiredFields: ['fullName', 'address', 'vehicleModel', 'registrationNumber', 'engineNumber'],
      detailedDescription: 'Vehicle registration is mandatory for all motor vehicles. It provides legal ownership proof and is required for insurance and road travel.',
      documents: ['Sale deed', 'Invoice/Receipt', 'Insurance policy', 'Pollution certificate', 'ID and address proof'],
      eligibility: ['Vehicle owner', 'Valid insurance', 'Pollution compliance', 'Complete documentation'],
      benefits: ['Legal ownership proof', 'Insurance validity', 'Road tax payment', 'Inter-state travel permission'],
      steps: ['Apply at RTO with documents', 'Verification of vehicle', 'Payment of fees and tax', 'Number plate issuance', 'Registration certificate generation']
    },
    {
      id: 'trans-004',
      name: 'Ownership Transfer',
      description: 'Transfer vehicle ownership',
      icon: '↔️',
      processingTime: '10 Days',
      department: 'Transport Department',
      fee: '₹300',
      requiredFields: ['fullName', 'address', 'registrationNumber', 'newOwnerName', 'newOwnerAddress'],
      detailedDescription: 'Transfer of vehicle ownership when selling or gifting a vehicle. Requires consent from both current and new owner.',
      documents: ['Registered RC', 'Signed NOC from current owner', 'New owner ID proof', 'Transfer form', 'Pollution certificate'],
      eligibility: ['Both parties consent required', 'No pending loans or penalties', 'Vehicle in valid condition', 'Insurance updated'],
      benefits: ['Legal ownership change', 'No liability transfer', 'Clear title', 'Updated insurance and registration'],
      steps: ['Both parties apply jointly', 'Furnish RC and NOC', 'Inspection by officer', 'Fee payment', 'New RC issuance']
    },
  ],
  taxRevenue: [
    {
      id: 'tax-001',
      name: 'Property Tax',
      description: 'Pay and manage property tax',
      icon: '🏢',
      processingTime: 'Instant',
      department: 'Revenue Department',
      fee: 'Variable',
      requiredFields: ['fullName', 'propertyAddress', 'surveyNumber', 'propertyValue', 'mobileNumber'],
      detailedDescription: 'Property tax is an annual tax levied on real property. Payment ensures property rights protection and municipal services availability.',
      documents: ['Property deed', 'Survey number', 'Property valuation report', 'ID proof', 'Address proof'],
      eligibility: ['Property owner', 'Permanent resident', 'Valid property documentation'],
      benefits: ['Property rights protection', 'Municipal services', 'Legal title confirmation', 'Tax deduction eligibility'],
      steps: ['Submit property details', 'Assessment and valuation', 'Tax calculation', 'Payment online/offline', 'Receipt generation']
    },
    {
      id: 'tax-002',
      name: 'Water Tax',
      description: 'Pay water supply tax',
      icon: '💧',
      processingTime: 'Instant',
      department: 'Water Board',
      fee: 'Variable',
      requiredFields: ['fullName', 'address', 'meterNumber', 'consumerNumber', 'mobileNumber'],
      detailedDescription: 'Water tax is charged for water supply consumption. Regular payment ensures continuous water supply and maintenance services.',
      documents: ['Water connection bill', 'Meter number', 'Consumer number', 'ID proof'],
      eligibility: ['Water connection holder', 'No pending dues', 'Valid meter number'],
      benefits: ['Uninterrupted water supply', 'Maintenance services', 'Quality water assurance', 'Emergency repair support'],
      steps: ['Check meter reading', 'Calculate consumption', 'Tax assessment', 'Payment portal', 'Bill receipt']
    },
    {
      id: 'tax-003',
      name: 'Land Tax',
      description: 'Pay agricultural land tax',
      icon: '🌾',
      processingTime: 'Instant',
      department: 'Revenue Department',
      fee: 'Variable',
      requiredFields: ['fullName', 'landAddress', 'surveyNumber', 'extent', 'mobileNumber'],
      detailedDescription: 'Land tax is an annual tax on agricultural properties. Essential for maintaining farming rights and land records.',
      documents: ['Land deed', 'Survey number', 'Patta/Chitta', 'Agricultural proof', 'ID proof'],
      eligibility: ['Land owner', 'Registered land documents', 'Agricultural classification'],
      benefits: ['Land rights protection', 'Subsidy eligibility', 'Loan security', 'Insurance coverage'],
      steps: ['Provide land details', 'Survey verification', 'Tax calculation', 'Payment', 'Tax receipt']
    },
  ],
  utilities: [
    {
      id: 'util-001',
      name: 'Water Connection',
      description: 'Apply for new water connection',
      icon: '🚰',
      processingTime: '20 Days',
      department: 'Water Board',
      fee: '₹1000',
      requiredFields: ['fullName', 'address', 'phoneNumber', 'propertyType', 'numberOfTaps'],
      detailedDescription: 'New water connection application for residential and commercial properties. Ensures supply of potable water to your premises.',
      documents: ['Property deed', 'ID proof', 'Address proof', 'No Objection Certificate', 'Site plan'],
      eligibility: ['Property owner/tenant', 'Valid property documents', 'Municipal area coverage', 'No prior connection'],
      benefits: ['Clean drinking water access', 'Health and hygiene', 'Property value improvement', 'Reuse water facilities'],
      steps: ['Apply with property proof', 'Inspection by officer', 'Feasibility check', 'Connection installation', 'Meter placement']
    },
    {
      id: 'util-002',
      name: 'Electricity Connection',
      description: 'Apply for electricity connection',
      icon: '⚡',
      processingTime: '15 Days',
      department: 'Electricity Board',
      fee: '₹500',
      requiredFields: ['fullName', 'address', 'phoneNumber', 'propertyType', 'loadRequired'],
      detailedDescription: 'Electricity connection application for residential and commercial properties. Essential utility for modern living and business operations.',
      documents: ['Property deed', 'Electricity board form', 'ID proof', 'Address proof', 'Deposit amount'],
      eligibility: ['Property owner/tenant', 'Valid address proof', 'Load requirement justified', 'No outstanding dues from previous connection'],
      benefits: ['Reliable power supply', 'Appliance operation', 'Safety and security lighting', 'Economic development'],
      steps: ['Submit application to board', 'Load sanctioning', 'Inspection', 'Meter installation', 'Connection activation']
    },
    {
      id: 'util-003',
      name: 'Sewage Connection',
      description: 'Apply for sewage connection',
      icon: '🔧',
      processingTime: '25 Days',
      department: 'Public Works Department',
      fee: '₹800',
      requiredFields: ['fullName', 'address', 'phoneNumber', 'propertyType', 'plotArea'],
      detailedDescription: 'Sewage connection for safe disposal of wastewater. Important for public health and environmental protection.',
      documents: ['Property deed', 'Site plan', 'ID proof', 'Address proof', 'Municipal approval'],
      eligibility: ['Property in municipal limits', 'Property ownership/lease', 'Septic tank compliance', 'No obstruction to pipelines'],
      benefits: ['Safe waste disposal', 'Disease prevention', 'Environment protection', 'Property hygiene improvement'],
      steps: ['Apply with site plan', 'Site inspection', 'Pipeline connection feasibility', 'Pipe laying and connection', 'Inspection and activation']
    },
  ],
};

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<(typeof allServices)[0] | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailedService, setDetailedService] = useState<(typeof allServices)[0] | null>(null);
  const { toast } = useToast();

  const allServices = [
    ...services.certificates,
    ...services.transport,
    ...services.taxRevenue,
    ...services.utilities,
  ];

  const filteredServices = allServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      matchesCategory =
        (selectedCategory === 'certificates' &&
          services.certificates.includes(service)) ||
        (selectedCategory === 'transport' && services.transport.includes(service)) ||
        (selectedCategory === 'taxRevenue' &&
          services.taxRevenue.includes(service)) ||
        (selectedCategory === 'utilities' && services.utilities.includes(service));
    }

    const matchesDepartment =
      selectedDepartment === 'all' || service.department === selectedDepartment;

    return matchesSearch && matchesCategory && matchesDepartment;
  });

  const handleApplyNow = (service: (typeof allServices)[0]) => {
    setSelectedService(service);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleViewDetails = (service: (typeof allServices)[0]) => {
    setDetailedService(service);
    setIsDetailsOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmitApplication = async () => {
    if (!selectedService) return;

    // Validate all required fields are filled
    const missingFields = selectedService.requiredFields.filter(
      (field) => !formData[field] || formData[field].trim() === ''
    );

    if (missingFields.length > 0) {
      toast({
        title: 'Validation Error',
        description: `Please fill all required fields: ${missingFields.join(', ')}`,
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Application submitted:', {
        service: selectedService.name,
        formData,
      });

      toast({
        title: 'Success!',
        description: `Your application for ${selectedService.name} has been submitted successfully. Your reference number is: ${Math.random().toString(36).substring(7).toUpperCase()}`,
      });

      setIsModalOpen(false);
      setSelectedService(null);
      setFormData({});
      setIsSubmitting(false);
    }, 1500);
  };

  const getFieldLabel = (field: string): string => {
    const labels: Record<string, string> = {
      fullName: 'Full Name',
      dateOfBirth: 'Date of Birth',
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      placeOfBirth: 'Place of Birth',
      occupation: 'Occupation',
      annualIncome: 'Annual Income',
      address: 'Address',
      community: 'Community',
      yearOfResidence: 'Year of Residence',
      nativePlace: 'Native Place',
      yearOfBirth: 'Year of Birth',
      mobileNumber: 'Mobile Number',
      licenseType: 'License Type',
      vehicleModel: 'Vehicle Model',
      registrationNumber: 'Registration Number',
      engineNumber: 'Engine Number',
      newOwnerName: 'New Owner Name',
      newOwnerAddress: 'New Owner Address',
      propertyAddress: 'Property Address',
      surveyNumber: 'Survey Number',
      propertyValue: 'Property Value',
      meterNumber: 'Meter Number',
      consumerNumber: 'Consumer Number',
      landAddress: 'Land Address',
      extent: 'Extent (in acres)',
      phoneNumber: 'Phone Number',
      propertyType: 'Property Type',
      numberOfTaps: 'Number of Taps',
      loadRequired: 'Load Required (in kW)',
      plotArea: 'Plot Area (in sq.ft)',
    };
    return labels[field] || field;
  };

  const renderFormField = (field: string) => {
    if (field === 'licenseType') {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field} className="text-sm font-semibold">
            {getFieldLabel(field)} *
          </Label>
          <Select value={formData[field] || ''} onValueChange={(value) => handleFormChange(field, value)}>
            <SelectTrigger id={field}>
              <SelectValue placeholder="Select License Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two-wheeler">Two Wheeler</SelectItem>
              <SelectItem value="three-wheeler">Three Wheeler</SelectItem>
              <SelectItem value="four-wheeler">Four Wheeler</SelectItem>
              <SelectItem value="heavy-vehicle">Heavy Vehicle</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    if (field === 'propertyType') {
      return (
        <div key={field} className="space-y-2">
          <Label htmlFor={field} className="text-sm font-semibold">
            {getFieldLabel(field)} *
          </Label>
          <Select value={formData[field] || ''} onValueChange={(value) => handleFormChange(field, value)}>
            <SelectTrigger id={field}>
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="industrial">Industrial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    let inputType = 'text';
    if (field === 'dateOfBirth') inputType = 'date';
    if (field.includes('Year') || field.includes('Number') || field.includes('annualIncome' || field.includes('Value') || field.includes('Area') || field.includes('Load'))) inputType = 'number';
    if (field === 'mobileNumber' || field === 'phoneNumber') inputType = 'tel';

    return (
      <div key={field} className="space-y-2">
        <Label htmlFor={field} className="text-sm font-semibold">
          {getFieldLabel(field)} *
        </Label>
        <Input
          id={field}
          type={inputType}
          placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
          value={formData[field] || ''}
          onChange={(e) => handleFormChange(field, e.target.value)}
          className="w-full"
        />
      </div>
    );
  };

  const ServiceCard = ({ service }: { service: (typeof allServices)[0] }) => (
    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{service.icon}</span>
              <h3 className="font-bold text-lg text-gray-900">{service.name}</h3>
            </div>
            <p className="text-sm text-gray-600">{service.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-3 bg-gray-50 -mx-6 px-6 rounded">
          <div>
            <p className="text-xs text-gray-500 font-semibold">PROCESSING TIME</p>
            <p className="text-sm font-semibold text-gray-900">{service.processingTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 font-semibold">DEPARTMENT</p>
            <p className="text-sm font-semibold text-gray-900">{service.department}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Badge variant="outline">{service.fee}</Badge>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-blue-600 border-blue-600"
              onClick={() => handleViewDetails(service)}
            >
              View Details
            </Button>
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleApplyNow(service)}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Government Services</h1>
          <p className="text-gray-600 text-lg">
            Access government services online with transparent and time-bound delivery.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          <Input
            type="search"
            placeholder="🔍 Search Services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-12 text-base"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="certificates">Certificates</SelectItem>
                <SelectItem value="transport">Transport Services</SelectItem>
                <SelectItem value="taxRevenue">Tax & Revenue</SelectItem>
                <SelectItem value="utilities">Public Utilities</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Revenue Department">Revenue Department</SelectItem>
                <SelectItem value="Transport Department">Transport Department</SelectItem>
                <SelectItem value="Water Board">Water Board</SelectItem>
                <SelectItem value="Electricity Board">Electricity Board</SelectItem>
                <SelectItem value="Public Works Department">Public Works Department</SelectItem>
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center px-4">
              Showing {filteredServices.length} services
            </div>
          </div>
        </div>

        {/* Services by Category */}
        {filteredServices.length > 0 ? (
          <div className="space-y-8">
            {/* Certificates */}
            {filteredServices.some((s) => services.certificates.includes(s)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4">
                  <span className="text-2xl">📄</span>
                  <h2 className="text-2xl font-bold text-gray-900">Certificates</h2>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredServices.filter((s) => services.certificates.includes(s)).length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices
                    .filter((s) => services.certificates.includes(s))
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
              </div>
            )}

            {/* Transport */}
            {filteredServices.some((s) => services.transport.includes(s)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4">
                  <span className="text-2xl">🚗</span>
                  <h2 className="text-2xl font-bold text-gray-900">Transport Services</h2>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredServices.filter((s) => services.transport.includes(s)).length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices
                    .filter((s) => services.transport.includes(s))
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
              </div>
            )}

            {/* Tax & Revenue */}
            {filteredServices.some((s) => services.taxRevenue.includes(s)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4">
                  <span className="text-2xl">💰</span>
                  <h2 className="text-2xl font-bold text-gray-900">Tax & Revenue</h2>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredServices.filter((s) => services.taxRevenue.includes(s)).length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices
                    .filter((s) => services.taxRevenue.includes(s))
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
              </div>
            )}

            {/* Utilities */}
            {filteredServices.some((s) => services.utilities.includes(s)) && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-4">
                  <span className="text-2xl">🔧</span>
                  <h2 className="text-2xl font-bold text-gray-900">Public Utilities</h2>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {filteredServices.filter((s) => services.utilities.includes(s)).length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices
                    .filter((s) => services.utilities.includes(s))
                    .map((service) => (
                      <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No services found. Try adjusting your filters.</p>
          </div>
        )}

        {/* Application Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <span>{selectedService?.icon}</span>
                Apply for {selectedService?.name}
              </DialogTitle>
              <DialogDescription>
                Fill in all required fields to submit your application. We'll process it within {selectedService?.processingTime}.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {selectedService?.requiredFields.map((field) => renderFormField(field))}
            </div>

            <DialogFooter className="gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Details Modal */}
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3 text-2xl">
                <span>{detailedService?.icon}</span>
                {detailedService?.name}
              </DialogTitle>
              <DialogDescription className="text-base">
                {detailedService?.detailedDescription}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Service Info */}
              <div className="grid grid-cols-2 gap-4 bg-blue-50 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Department</p>
                  <p className="text-lg font-bold text-gray-900">{detailedService?.department}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Processing Time</p>
                  <p className="text-lg font-bold text-gray-900">{detailedService?.processingTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-semibold">Fee</p>
                  <p className="text-lg font-bold text-blue-600">{detailedService?.fee}</p>
                </div>
              </div>

              {/* Documents Required */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📄</span> Required Documents
                </h3>
                <ul className="space-y-2">
                  {detailedService?.documents.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-blue-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">✅</span> Eligibility Criteria
                </h3>
                <ul className="space-y-2">
                  {detailedService?.eligibility.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-600 font-bold mt-1">•</span>
                      <span className="text-gray-700">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">🎯</span> Benefits
                </h3>
                <ul className="space-y-2">
                  {detailedService?.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold mt-1">★</span>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply Steps */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-xl">📋</span> How to Apply
                </h3>
                <ol className="space-y-2">
                  {detailedService?.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 mt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <DialogFooter className="gap-3">
              <Button 
                variant="outline" 
                onClick={() => setIsDetailsOpen(false)}
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setIsDetailsOpen(false);
                  if (detailedService) {
                    handleApplyNow(detailedService);
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Apply Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
