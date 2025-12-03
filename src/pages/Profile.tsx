import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-16 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="size-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Personal Information</h2>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit Profile
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Add phone number"
              />
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Add address"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 mt-6">
              <Button type="submit">Save Changes</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    name: user.name,
                    email: user.email,
                    phone: user.phone || '',
                    address: user.address || '',
                  });
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl mb-4">Account Actions</h2>
        <Button onClick={handleLogout} variant="destructive">
          Logout
        </Button>
      </Card>
    </div>
  );
}
