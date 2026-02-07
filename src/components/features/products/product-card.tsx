'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Package } from 'lucide-react';
import type { Product } from '@/types';
import { Button, Badge } from '@/components/ui';
import { formatPrice, isOnSale, getDiscountPercentage, getEffectivePrice } from '@/lib/utils';
import { useAddToCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useAddToCart();
  const { success, error } = useToast();
  
  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);
  const effectivePrice = getEffectivePrice(product);

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1 });
      success('Producto agregado', `${product.name} se agrego al carrito`);
    } catch (err) {
      error('Error', 'No se pudo agregar el producto al carrito');
    }
  };

  return (
    <div className="group bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      {/* Image Container */}
      <Link href={`/productos/${product.sku}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}
        
        {/* Sale Badge */}
        {onSale && (
          <div className="absolute top-2 left-2">
            <Badge variant="danger">-{discount}%</Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link href={`/productos/${product.sku}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="mt-1 text-xs text-gray-500">SKU: {product.sku}</p>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-[var(--color-primary)]">
            {formatPrice(effectivePrice)}
          </span>
          {onSale && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.regularPrice)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          isLoading={addToCart.isPending}
          disabled={!product.isActive}
          className="mt-3 w-full"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.isActive ? 'Agregar al carrito' : 'No disponible'}
        </Button>
      </div>
    </div>
  );
}
