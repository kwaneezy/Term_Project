import { Card } from '../components/ui/card';
import { Smartphone, Shield, Truck, Headphones } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">About PhoneHub</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted destination for the latest smartphones from top brands worldwide
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="p-6">
          <h2 className="text-2xl mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            Founded in 2020, PhoneHub started with a simple mission: to make premium smartphones accessible to everyone. We believe that technology should empower people, and the right smartphone can make all the difference in staying connected, productive, and creative.
          </p>
          <p className="text-gray-700">
            Today, we're proud to offer a curated selection of the best smartphones from leading manufacturers including Apple, Samsung, Google, OnePlus, and more. Our team of tech enthusiasts carefully selects each product to ensure our customers get the best value and performance.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl mb-4">Why Choose Us</h2>
          <p className="text-gray-700 mb-4">
            At PhoneHub, we're more than just a store. We're your technology partner, committed to helping you find the perfect device that fits your lifestyle and budget. With competitive pricing, genuine products, and exceptional customer service, we make your shopping experience seamless.
          </p>
          <p className="text-gray-700">
            Every phone we sell comes with manufacturer warranty, secure payment options, and fast, reliable shipping. Our customer support team is always ready to assist you before, during, and after your purchase.
          </p>
        </Card>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="p-6 text-center">
          <div className="size-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="size-6 text-blue-600" />
          </div>
          <h3 className="text-lg mb-2">Premium Selection</h3>
          <p className="text-gray-600 text-sm">
            Carefully curated collection of flagship and mid-range smartphones
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="size-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="size-6 text-green-600" />
          </div>
          <h3 className="text-lg mb-2">100% Authentic</h3>
          <p className="text-gray-600 text-sm">
            All products are genuine with full manufacturer warranty
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="size-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Truck className="size-6 text-purple-600" />
          </div>
          <h3 className="text-lg mb-2">Fast Shipping</h3>
          <p className="text-gray-600 text-sm">
            Free shipping on all orders with tracking
          </p>
        </Card>

        <Card className="p-6 text-center">
          <div className="size-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Headphones className="size-6 text-orange-600" />
          </div>
          <h3 className="text-lg mb-2">Expert Support</h3>
          <p className="text-gray-600 text-sm">
            Dedicated customer service team ready to help
          </p>
        </Card>
      </div>

      <Card className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl mb-4">Our Mission</h2>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            To connect people with the technology they love, providing exceptional products and service that exceed expectations every time.
          </p>
        </div>
      </Card>
    </div>
  );
}
