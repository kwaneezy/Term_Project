import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner@2.0.3';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage[0] || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <Button onClick={() => navigate('/')}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedColor}-${selectedStorage}`,
      name: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      storage: selectedStorage,
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button onClick={() => navigate('/')} variant="ghost" className="mb-6">
        ← Back to Products
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
          <ImageWithFallback
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <div className="mb-2 text-gray-500">{product.brand}</div>
          <h1 className="text-3xl mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-gray-500">({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl text-blue-600 mb-6">${product.price}</div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="mb-3">Color</div>
            <div className="flex flex-wrap gap-2">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    selectedColor === color
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="mb-6">
            <div className="mb-3">Storage</div>
            <div className="flex flex-wrap gap-2">
              {product.storage.map(storage => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 border rounded-lg transition-colors ${
                    selectedStorage === storage
                      ? 'border-blue-600 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.inStock ? (
              <Badge variant="default" className="bg-green-600">
                <Check className="size-3 mr-1" />
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full mb-4"
            size="lg"
          >
            <ShoppingCart className="size-5 mr-2" />
            Add to Cart
          </Button>

          {/* Specifications */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl mb-4">Specifications</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Display</span>
                <span>{product.specs.display}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Processor</span>
                <span>{product.specs.processor}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Camera</span>
                <span>{product.specs.camera}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Battery</span>
                <span>{product.specs.battery}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Operating System</span>
                <span>{product.specs.os}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
