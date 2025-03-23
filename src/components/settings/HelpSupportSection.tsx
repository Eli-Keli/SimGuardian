
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { HelpCircle, LifeBuoy, Flag, MessageSquare, FileText, ExternalLink } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';

export const HelpSupportSection = () => {
  const form = useForm({
    defaultValues: {
      category: '',
      subject: '',
      description: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Support request submitted:', data);
    // Implementation would handle form submission
  };

  const faqItems = [
    {
      question: 'What is SIM swapping?',
      answer: 'SIM swapping is a type of account takeover fraud that involves a scammer taking control of your phone number by transferring it to a SIM card they control. This allows them to receive your calls and texts, potentially bypassing two-factor authentication.'
    },
    {
      question: 'How does SimGuardian protect me?',
      answer: 'SimGuardian monitors for suspicious SIM swap activities, provides real-time alerts, and offers tools to report and track scams. We also provide education on best practices to protect yourself from mobile fraud.'
    },
    {
      question: 'What should I do if I receive a scam alert?',
      answer: 'If you receive a scam alert, immediately check your phone connectivity. If you suspect a SIM swap has occurred, contact your carrier immediately, change passwords to important accounts, and report the incident through our app.'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>Quick answers to common questions about SimGuardian</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="p-3 rounded-md bg-secondary/30 border border-border/50">
                <h4 className="font-medium mb-1">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
            <div className="text-center mt-2">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Full FAQ
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <LifeBuoy className="h-5 w-5 text-primary" />
            Support Options
          </CardTitle>
          <CardDescription>Get help from our team or community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <MessageSquare className="h-6 w-6" />
              <span>Contact Support</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <FileText className="h-6 w-6" />
              <span>Documentation</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center justify-center h-24 gap-2">
              <MessageSquare className="h-6 w-6" />
              <span>Community Forum</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-primary" />
            Report an Issue
          </CardTitle>
          <CardDescription>Report bugs or suggest new features</CardDescription>
        </CardHeader>
        <CardContent>
          <Sheet>
            <SheetTrigger asChild>
              <Button>Submit Feedback</Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Submit Feedback</SheetTitle>
                <SheetDescription>
                  Help us improve SimGuardian by reporting issues or suggesting features.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="bug">Bug Report</SelectItem>
                              <SelectItem value="feature">Feature Request</SelectItem>
                              <SelectItem value="feedback">General Feedback</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Brief description of the issue" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please provide details about what you experienced or what you'd like to see improved..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include steps to reproduce if reporting a bug.
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">Submit</Button>
                  </form>
                </Form>
              </div>
            </SheetContent>
          </Sheet>
        </CardContent>
      </Card>
    </div>
  );
};
