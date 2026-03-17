import { useEffect } from "react";
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Skeleton, Alert } from "../components/ui";

function fetchStart(state) {
  return {
    ...state,
    isLoading: true,
    error: null,
  };
}

function fetchSuccess(state, action) {
  return {
    ...state,
    isLoading: false,
    products: action.payload,
  };
}

function fetchError(state, action) {
  return {
    ...state,
    isLoading: false,
    error: action.payload,
  };
}

function addToCart(state, action) {
  const product = state.products.find((p) => p.id === action.payload);

  if (product.stock === 0) return state;

  const productInCart = state.cart.find((p) => p.id === action.payload);

  let newCart;
  if (productInCart) {
    newCart = state.cart.map((p) => {
      if (p.id === productInCart.id) {
        return { ...p, price: p.price + product.price, qty: p.qty + 1 };
      }
      return p;
    });
  } else {
    newCart = [
      ...state.cart,
      { id: product.id, name: product.name, price: product.price, qty: 1 },
    ];
  }

  const updatedProducts = state.products.map((p) => {
    if (p.id === action.payload) {
      return { ...p, stock: p.stock - 1 };
    }
    return p;
  });

  return { ...state, cart: newCart, products: updatedProducts };
}

function decreaseQty(state, action) {
  const product = state.products.find((p) => p.id === action.payload);

  const productInCart = state.cart.find((p) => p.id === action.payload);

  if (!product || !productInCart) return state;

  let updatedCart;
  if (productInCart.qty > 1) {
    updatedCart = state.cart.map((p) => {
      if (p.id === productInCart.id) {
        return { ...p, price: p.price - product.price, qty: p.qty - 1 };
      }
      return p;
    });
  } else {
    updatedCart = state.cart.filter((p) => p.id !== productInCart.id);
  }

  const updatedProducts = state.products.map((p) => {
    if (p.id === productInCart.id) {
      return { ...p, stock: p.stock + 1 };
    }
    return p;
  });

  return { ...state, cart: updatedCart, products: updatedProducts };
}

function removeFromCart(state, action) {
  const productInCart = state.cart.find((p) => p.id === action.payload);

  if (!productInCart) return state;

  const updatedCart = state.cart.filter((p) => p.id !== productInCart.id);

  const updatedProducts = state.products.map((p) => {
    if (p.id === productInCart.id) {
      return { ...p, stock: p.stock + productInCart.qty };
    }
    return p;
  });

  return { ...state, cart: updatedCart, products: updatedProducts };
}

function checkoutOrder(state) {
  const order = {
    id: crypto.randomUUID(),
    isCancelled: false,
    details: state.cart.reduce((acc, p) => (acc = [...acc, p]), []),
  };
  const newOrders = [...state.orders, order];

  const updatedCart = [];

  return { ...state, orders: newOrders, cart: updatedCart };
}

function cancelOrder(state, action) {
  const order = state.orders.find((o) => o.id === action.payload);

  if (!order) return state;

  const newOrders = state.orders.map((o) => {
    if (o.id === order.id) {
      return { ...o, isCancelled: true };
    }
    return o;
  });

  const updatedProducts = state.products.map((p) => {
    const itemInOrder = order.details.find((d) => d.id === p.id);
    if (itemInOrder) {
      return { ...p, stock: p.stock + itemInOrder.qty };
    }
    return p;
  });

  return { ...state, orders: newOrders, products: updatedProducts };
}

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return fetchStart(state);
    case "FETCH_SUCCESS":
      return fetchSuccess(state, action);
    case "FETCH_ERROR":
      return fetchError(state, action);
    case "ADD_TO_CART":
      return addToCart(state, action);
    case "DECREASE_QTY":
      return decreaseQty(state, action);
    case "REMOVE_FROM_CART":
      return removeFromCart(state, action);
    case "CHECKOUT_ORDER":
      return checkoutOrder(state);
    case "CANCEL_ORDER":
      return cancelOrder(state, action);
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

export default function UseReducerPractice() {
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    cart: [],
    orders: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/Aiyon860/fake-api-json/products",
          { signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("Fetch cancelled: component unmount");
          return;
        } else {
          dispatch({ type: "FETCH_ERROR", payload: e.message });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return (
    <article className="space-y-8">
      <header className="border-b border-border-subtle pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-content-primary">
          useReducer Demo
        </h1>
        <p className="text-content-secondary mt-2 max-w-2xl">
          Simulating order checkout in a marketplace.
        </p>
        <div className="mt-4 rounded-2xl border border-status-warning/20 bg-status-warning/10 px-4 py-3 text-status-warning">
          <p className="text-sm">
            Disclaimer: This is just a simulation. Product data is fetched from{" "}
            <span className="font-medium">
              "https://my-json-server.typicode.com/Aiyon860/fake-api-json/products"
            </span>{" "}
            and is not manipulated directly. Stock changes only occur in React
            state (e.g., reducing or increasing stock in state only).
          </p>
        </div>
      </header>

      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-md border border-border-default bg-surface-raised px-3 py-2 text-sm font-medium text-content-secondary shadow-sm hover:border-brand-primary/50 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base transition-all"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to Menu
        </Link>
      </div>

      {/* Top Section: Product List */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-content-primary">
            Product List
          </h2>
          <span className="text-sm text-content-tertiary">
            Total Products: {state.products.length}
          </span>
        </div>
        {state.isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border-subtle rounded-lg bg-surface-sunken">
              <Skeleton items={[{ height: "h-32" }, { height: "h-4" }]} />
            </div>
            <div className="p-4 border border-border-subtle rounded-lg bg-surface-sunken">
              <Skeleton items={[{ height: "h-32" }, { height: "h-4" }]} />
            </div>
            <div className="p-4 border border-border-subtle rounded-lg bg-surface-sunken lg:block hidden">
              <Skeleton items={[{ height: "h-32" }, { height: "h-4" }]} />
            </div>
          </div>
        ) : state.error ? (
          <Alert type="error">
            <p className="font-medium">Failed to fetch product data.</p>
            <p className="text-sm mt-1">{state.error}</p>
          </Alert>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.products.map((product) => {
              return (
                <li key={product.id} className="h-full">
                  <div className="flex h-full flex-col rounded-lg border border-border-subtle p-4 bg-surface-base hover:border-brand-primary/30 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium text-content-primary line-clamp-2">
                        {product.name}
                      </p>
                      <p className="text-sm text-content-secondary">
                        Stock: {product.stock}
                      </p>
                      <p className="text-sm text-content-secondary">
                        Price: Rp {product.price}
                      </p>
                    </div>
                    <Button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "ADD_TO_CART", payload: product.id })
                      }
                      disabled={product.stock === 0}
                      variant="primary"
                      className="mt-4"
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Card>

      {/* Middle Section: Cart */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-content-primary">Cart</h2>
          <span className="text-sm text-content-tertiary">
            Total Item: {state.cart.length}
          </span>
        </div>
        <ul className="space-y-3">
          {state.cart.length === 0 ? (
            <p className="text-content-tertiary italic text-sm">
              Cart is still empty.
            </p>
          ) : (
            state.cart.map((product) => {
              return (
                <li
                  key={product.id}
                  className="flex items-center justify-between p-4 border border-border-subtle rounded-lg bg-surface-base"
                >
                  <div>
                    <p className="font-medium text-content-primary">
                      {product.name}
                    </p>
                    <p className="text-sm text-content-secondary">
                      Qty: {product.qty}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={() =>
                        dispatch({ type: "DECREASE_QTY", payload: product.id })
                      }
                      variant="secondary"
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <Button
                      type="button"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product.id,
                        })
                      }
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <div className="mt-4 flex items-center justify-between pt-4 border-t border-border-subtle">
          <span className="text-sm text-content-secondary">
            Total:{" "}
            <span className="font-semibold text-content-primary">
              Rp {state.cart.reduce((acc, p) => acc + p.price, 0)}
            </span>
          </span>
          <Button
            type="button"
            onClick={() => dispatch({ type: "CHECKOUT_ORDER" })}
            disabled={state.cart.length === 0}
            variant="success"
          >
            Checkout
          </Button>
        </div>
      </Card>

      {/* Bottom Section: Order History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-content-primary">
            Order History
          </h2>
          <span className="text-sm text-content-tertiary">
            Total Order: {state.orders.length}
          </span>
        </div>
        <div className="space-y-3">
          {state.orders.length === 0 ? (
            <p className="text-content-tertiary italic text-sm">
              No order history yet.
            </p>
          ) : (
            state.orders.map((o) => {
              return (
                <div
                  key={o.id}
                  className="p-4 border border-border-subtle rounded-lg space-y-3 bg-surface-base"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-content-primary">
                        Order #{o.id.substring(0, 8)}...
                      </p>
                      <p className="text-sm text-content-secondary">
                        Status: {o.isCancelled ? "Cancelled" : "Pending"}
                      </p>
                      {o.isCancelled && (
                        <p className="text-sm text-status-error mt-1 font-medium">
                          This order has been cancelled.
                        </p>
                      )}
                    </div>
                    {!o.isCancelled && (
                      <Button
                        type="button"
                        onClick={() =>
                          dispatch({ type: "CANCEL_ORDER", payload: o.id })
                        }
                        variant="warning"
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {o.details.map((d) => (
                      <div
                        key={d.id}
                        className="flex items-center justify-between rounded-md border border-border-subtle bg-surface-sunken px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-content-primary">
                            {d.name}
                          </p>
                          <p className="text-xs text-content-tertiary">
                            Qty: {d.qty}
                          </p>
                        </div>
                        <p className="text-sm text-content-secondary">
                          Rp {d.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </article>
  );
}
