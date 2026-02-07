'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Minus, Plus, Package, ChevronLeft, Check } from 'lucide-react';
import { useProductBySku } from '@/hooks/use-products';
import { useAddToCart } from '@/hooks/use-cart';
import { useToast } from '@/components/ui/toast';
import { Button, Badge, Spinner } from '@/components/ui';
import { formatPrice, isOnSale, getDiscountPercentage, getEffectivePrice } from '@/lib/utils';

interface ProductDetailPageProps {
  params: Promise<{ sku: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { sku } = use(params);
  const { data, isLoading, error } = useProductBySku(sku);
  const addToCart = useAddToCart();
  const { success, error: showError } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-gray-300" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Producto no encontrado</h1>
        <p className="mt-2 text-gray-500">El producto que buscas no existe o ya no esta disponible.</p>
        <Link href="/productos">
          <Button className="mt-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Volver a productos
          </Button>
        </Link>
      </div>
    );
  }

  const onSale = isOnSale(product);
  const discount = getDiscountPercentage(product);
  const effectivePrice = getEffectivePrice(product);

  const handleAddToCart = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity });
      success('Producto agregado', `${product.name} se agrego al carrito`);
    } catch (err) {
      showError('Error', 'No se pudo agregar el producto al carrito');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Inicio
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/productos" className="text-gray-500 hover:text-gray-700">
              Productos
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Package className="h-32 w-32 text-gray-300" />
            </div>
          )}
          
          {onSale && (
            <div className="absolute top-4 left-4">
              <Badge variant="danger" size="md">-{discount}%</Badge>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-8 lg:mt-0">
          {/* SKU */}
          <p className="text-sm text-gray-500">SKU: {product.sku}</p>

          {/* Name */}
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-[var(--color-primary)]">
              {formatPrice(effectivePrice)}
            </span>
            {onSale && (
              <span className="text-xl text-gray-400 line-through">
                {formatPrice(product.regularPrice)}
              </span>
            )}
          </div>

          {/* Availability */}
          <div className="mt-4">
            {product.isActive ? (
              <Badge variant="success">
                <Check className="h-3 w-3 mr-1" />
                Disponible
              </Badge>
            ) : (
              <Badge variant="danger">No disponible</Badge>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-gray-900">Descripcion</h2>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {product.description}
              </p>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="mt-8">
            <label className="text-sm font-semibold text-gray-900">Cantidad</label>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-gray-600 hover:text-gray-900"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-gray-600 hover:text-gray-900"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                Total: {formatPrice(effectivePrice * quantity)}
              </span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <Button
              size="lg"
              onClick={handleAddToCart}
              isLoading={addToCart.isPending}
              disabled={!product.isActive}
              className="w-full md:w-auto"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Agregar al carrito
            </Button>
          </div>

          {/* Product Details */}
          {(product.weight || product.dimensionLength) && (
            <div className="mt-8 border-t pt-8">
              <h2 className="text-sm font-semibold text-gray-900">Especificaciones</h2>
              <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                {product.weight && (
                  <>
                    <dt className="text-gray-500">Peso</dt>
                    <dd className="text-gray-900">{product.weight} kg</dd>
                  </>
                )}
                {product.dimensionLength && (
                  <>
                    <dt className="text-gray-500">Dimensiones</dt>
                    <dd className="text-gray-900">
                      {product.dimensionLength} x {product.dimensionWidth} x {product.dimensionHeight} cm
                    </dd>
                  </>
                )}
              </dl>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
