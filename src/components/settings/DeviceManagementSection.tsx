
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Shield, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import StatusBadge from '@/components/StatusBadge';
import { format } from 'date-fns';

// Define device type
type Device = {
  id: string;
  phone_number: string;
  device_model: string;
  carrier: string | null;
  nickname: string | null;
  status: 'active' | 'lost' | 'stolen' | 'suspended';
  notes: string | null;
  registered_at: string;
  updated_at: string;
};

// Define form data type
type DeviceFormData = {
  phone_number: string;
  device_model: string;
  carrier?: string;
  nickname?: string;
  notes?: string;
};

export const DeviceManagementSection = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null);
  const [newStatus, setNewStatus] = useState<'active' | 'lost' | 'stolen' | 'suspended'>('active');
  const [statusReason, setStatusReason] = useState('');

  const { toast } = useToast();
  const { user } = useAuth();

  const form = useForm<DeviceFormData>({
    defaultValues: {
      phone_number: '',
      device_model: '',
      carrier: '',
      nickname: '',
      notes: '',
    },
  });

  const editForm = useForm<DeviceFormData>({
    defaultValues: {
      phone_number: '',
      device_model: '',
      carrier: '',
      nickname: '',
      notes: '',
    },
  });

  // Fetch devices
  const fetchDevices = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('devices')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDevices(data as Device[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching devices',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [user]);

  // Add device
  const onAddDevice = async (data: DeviceFormData) => {
    if (!user) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('devices')
        .insert({
          user_id: user.id,
          phone_number: data.phone_number,
          device_model: data.device_model,
          carrier: data.carrier || null,
          nickname: data.nickname || null,
          notes: data.notes || null,
        });

      if (error) {
        throw error;
      }

      toast({
        title: 'Device added',
        description: 'Your device has been successfully registered.',
      });

      form.reset();
      setIsAddDialogOpen(false);
      fetchDevices();
    } catch (error: any) {
      toast({
        title: 'Error adding device',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update device
  const onUpdateDevice = async (data: DeviceFormData) => {
    if (!user || !currentDevice) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('devices')
        .update({
          phone_number: data.phone_number,
          device_model: data.device_model,
          carrier: data.carrier || null,
          nickname: data.nickname || null,
          notes: data.notes || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentDevice.id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Device updated',
        description: 'Your device information has been updated successfully.',
      });

      setIsEditDialogOpen(false);
      fetchDevices();
    } catch (error: any) {
      toast({
        title: 'Error updating device',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete device
  const onDeleteDevice = async (deviceId: string) => {
    if (!user) return;

    if (!confirm('Are you sure you want to delete this device? This action cannot be undone.')) {
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('devices')
        .delete()
        .eq('id', deviceId);

      if (error) {
        throw error;
      }

      toast({
        title: 'Device deleted',
        description: 'The device has been removed from your account.',
      });

      fetchDevices();
    } catch (error: any) {
      toast({
        title: 'Error deleting device',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update device status
  const onUpdateStatus = async () => {
    if (!user || !currentDevice) return;

    try {
      setIsLoading(true);

      // First log the status change
      const { error: logError } = await supabase
        .from('device_status_logs')
        .insert({
          device_id: currentDevice.id,
          user_id: user.id,
          previous_status: currentDevice.status,
          new_status: newStatus,
          reason: statusReason,
        });

      if (logError) {
        throw logError;
      }

      // Then update the device status
      const { error: updateError } = await supabase
        .from('devices')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq('id', currentDevice.id);

      if (updateError) {
        throw updateError;
      }

      toast({
        title: 'Status updated',
        description: `Device status changed to ${newStatus}.`,
      });

      setIsStatusDialogOpen(false);
      setStatusReason('');
      fetchDevices();
    } catch (error: any) {
      toast({
        title: 'Error updating status',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit device
  const handleEditDevice = (device: Device) => {
    setCurrentDevice(device);
    editForm.reset({
      phone_number: device.phone_number,
      device_model: device.device_model,
      carrier: device.carrier || '',
      nickname: device.nickname || '',
      notes: device.notes || '',
    });
    setIsEditDialogOpen(true);
  };

  // Handle change status
  const handleStatusChange = (device: Device) => {
    setCurrentDevice(device);
    setNewStatus(device.status === 'active' ? 'suspended' : 'active');
    setIsStatusDialogOpen(true);
  };

  const getStatusBadgeType = (status: string): 'safe' | 'flagged' | 'alert' | 'pending' => {
    switch (status) {
      case 'active':
        return 'safe';
      case 'lost':
        return 'alert';
      case 'stolen':
        return 'flagged';
      case 'suspended':
        return 'pending';
      default:
        return 'pending';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Device Management
          </CardTitle>
          <CardDescription>
            Register and manage your SIM cards and devices for better security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Your Registered Devices</h3>
            <Button
              onClick={() => {
                form.reset();
                setIsAddDialogOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Device
            </Button>
          </div>

          {devices.length === 0 && !isLoading ? (
            <div className="text-center py-10 border border-dashed rounded-md">
              <Smartphone className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No devices registered</h3>
              <p className="text-muted-foreground mb-4">Register your devices to better protect them</p>
              <Button
                onClick={() => {
                  form.reset();
                  setIsAddDialogOpen(true);
                }}
                variant="outline"
              >
                Add Your First Device
              </Button>
            </div>
          ) : (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Phone Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Added</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center h-24">
                        Loading devices...
                      </TableCell>
                    </TableRow>
                  ) : (
                    devices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{device.nickname || device.device_model}</p>
                            <p className="text-sm text-muted-foreground">{device.carrier || 'Unknown carrier'}</p>
                          </div>
                        </TableCell>
                        <TableCell>{device.phone_number}</TableCell>
                        <TableCell>
                          <StatusBadge status={getStatusBadgeType(device.status)} />
                        </TableCell>
                        <TableCell>
                          {format(new Date(device.registered_at), 'MMM d, yyyy')}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(device)}
                              title={`Mark as ${device.status === 'active' ? 'lost/stolen' : 'active'}`}
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditDevice(device)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onDeleteDevice(device.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Device Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Register New Device</DialogTitle>
            <DialogDescription>
              Add your SIM card or device details for better security monitoring.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onAddDevice)} className="space-y-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} required />
                    </FormControl>
                    <FormDescription>
                      The phone number associated with this SIM card
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="device_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Model *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. iPhone 13, Samsung Galaxy S21" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="carrier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network Carrier</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Safaricom, Airtel, Telkom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Personal Phone, Work Phone" {...field} />
                    </FormControl>
                    <FormDescription>
                      A friendly name to help you identify this device
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about this device"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Register Device'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Device Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Device</DialogTitle>
            <DialogDescription>
              Update the information for your registered device.
            </DialogDescription>
          </DialogHeader>

          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onUpdateDevice)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="device_model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device Model *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. iPhone 13, Samsung Galaxy S21" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="carrier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Network Carrier</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Safaricom, Airtel, Telkom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nickname</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Personal Phone, Work Phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about this device"
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Updating...' : 'Update Device'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Change Device Status</DialogTitle>
            <DialogDescription>
              Update the status of your device.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div>
              <h4 className="font-medium mb-2">Current Status:</h4>
              <StatusBadge status={currentDevice ? getStatusBadgeType(currentDevice.status) : 'pending'} />
            </div>

            <div>
              <h4 className="font-medium mb-2">New Status:</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={newStatus === 'active' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewStatus('active')}
                >
                  Active
                </Button>
                <Button
                  type="button"
                  variant={newStatus === 'lost' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewStatus('lost')}
                >
                  Lost
                </Button>
                <Button
                  type="button"
                  variant={newStatus === 'stolen' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewStatus('stolen')}
                >
                  Stolen
                </Button>
                <Button
                  type="button"
                  variant={newStatus === 'suspended' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewStatus('suspended')}
                >
                  Suspended
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Reason for change (optional):</h4>
              <Textarea
                placeholder="Describe why you're changing the status"
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsStatusDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={onUpdateStatus}
              disabled={isLoading}
              variant={newStatus === 'stolen' || newStatus === 'lost' ? 'destructive' : 'default'}
            >
              {isLoading ? 'Updating...' : 'Update Status'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
