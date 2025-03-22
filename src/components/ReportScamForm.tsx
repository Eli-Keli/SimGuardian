
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MapPin, Upload, AlertTriangle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const scamTypes = [
  { id: 'sim_swap', label: 'SIM Swap' },
  { id: 'phishing', label: 'Phishing' },
  { id: 'fake_support', label: 'Fake Support Call' },
  { id: 'fraud_text', label: 'Fraudulent Text Message' },
  { id: 'identity_theft', label: 'Identity Theft' },
  { id: 'other', label: 'Other' },
];

const ReportScamForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Scam Report Submitted",
        description: "Thank you for helping make our community safer. Your report has been received and is under review.",
        variant: "default",
      });
    }, 1500);
  };
  
  const handleShareLocation = () => {
    if (navigator.geolocation) {
      setLocationShared(true);
      toast({
        title: "Location shared",
        description: "Your current location has been attached to the report.",
        variant: "default",
      });
    } else {
      toast({
        title: "Location unavailable",
        description: "Your browser doesn't support geolocation services.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="+254 734 456789" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="scamType">Type of Scam</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select scam type" />
            </SelectTrigger>
            <SelectContent>
              {scamTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Please provide details about the scam or suspicious activity..." 
          rows={4}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="dateTime">Date & Time of Incident</Label>
          <Input id="dateTime" type="datetime-local" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            Location
            <span className="text-xs text-muted-foreground">(Optional)</span>
          </Label>
          <div className="flex gap-2">
            <Input 
              id="location" 
              type="text" 
              placeholder="Enter location or auto-detect" 
              disabled={locationShared}
              className="flex-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={handleShareLocation}
              disabled={locationShared}
              className="shrink-0"
            >
              <MapPin size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="evidence" className="flex items-center gap-2">
          Attach Evidence 
          <span className="text-xs text-muted-foreground">(Optional)</span>
        </Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag and drop files here, or <span className="text-primary hover:underline cursor-pointer">browse</span>
            </p>
            <p className="text-xs text-muted-foreground">
              Upload screenshots, call logs, or other evidence (MAX: 5MB per file)
            </p>
          </div>
          <Input id="evidence" type="file" multiple className="hidden" />
        </div>
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground"
      >
        <AlertTriangle className="mr-2 h-4 w-4" />
        {isSubmitting ? "Submitting Report..." : "Report Scam Now"}
      </Button>
    </form>
  );
};

export default ReportScamForm;
