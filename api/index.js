var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: !0 });
}, __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
)), __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: !0 }), mod);

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  publicPath: () => publicPath,
  routes: () => routes
});
module.exports = __toCommonJS(stdin_exports);

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest,
  handleDataRequest: () => handleDataRequest
});
var import_server = require("react-dom/server"), import_react = require("@remix-run/react"), import_remix = require("@mantine/remix"), import_jsx_dev_runtime = require("react/jsx-dev-runtime"), handleDataRequest = async (response, { request }) => {
  let isGet = request.method.toLowerCase() === "get", isPrefetch = (request.headers.get("Purpose") || request.headers.get("X-Purpose") || request.headers.get("Sec-Purpose") || request.headers.get("Sec-Fetch-Purpose") || request.headers.get("Moz-Purpose")) === "prefetch";
  return isGet && isPrefetch && !response.headers.has("Cache-Control") && response.headers.set("Cache-Control", "private, max-age=5"), response;
}, server = (0, import_remix.createStylesServer)();
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_react.RemixServer, {
      context: remixContext,
      url: request.url
    }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 37,
      columnNumber: 3
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response(`<!DOCTYPE html>${(0, import_remix.injectStyles)(markup, server)}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  Document: () => Document,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
var import_core = require("@mantine/core"), import_modals = require("@mantine/modals"), import_notifications2 = require("@mantine/notifications"), import_remix2 = require("@mantine/remix"), import_node3 = require("@remix-run/node"), import_react3 = require("@remix-run/react");

// app.config.ts
var appConfig = {
  name: "Grocery Management Application",
  logo: "https://img.freepik.com/free-vector/supermarket-logo-template-theme_23-2148452347.jpg?w=826&t=st=1669999175~exp=1669999775~hmac=ea6758afbe86f4d4554838c291705e1264c8fedb2a430ab387ae6af4279f654f",
  updateStatusAutomatically: !1,
  statusUpdateInterval: 1e4
}, app_config_default = appConfig;

// app/context/CartContext.tsx
var import_solid = require("@heroicons/react/24/solid"), import_notifications = require("@mantine/notifications"), React2 = __toESM(require("react"));

// app/utils/hooks.ts
var import_react2 = require("@remix-run/react"), React = __toESM(require("react"));
function useMatchesData(routeId) {
  let matchingRoutes = (0, import_react2.useMatches)(), route = React.useMemo(
    () => matchingRoutes.find((route2) => route2.id === routeId),
    [matchingRoutes, routeId]
  );
  return route == null ? void 0 : route.data;
}
function useOptionalUser() {
  return useMatchesData("root");
}
function useAppData() {
  return useMatchesData("routes/__app");
}
function useProduct(slug) {
  let { products } = useAppData();
  return products.find((product2) => product2.slug === slug);
}
function useLocalStorageState({
  key,
  defaultValue
}) {
  let [value, setValue] = React.useState(defaultValue);
  return React.useEffect(() => {
    let localStorageValue = window.localStorage.getItem(key);
    if (!localStorageValue) {
      setValue(defaultValue);
      return;
    }
    setValue(JSON.parse(localStorageValue));
  }, []), React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]), [value, setValue];
}

// app/context/CartContext.tsx
var import_jsx_dev_runtime2 = require("react/jsx-dev-runtime"), LocalStorageKey = "ekart-application", CartContext = React2.createContext(void 0);
function CartProvider({ children }) {
  let [items, setItems] = useLocalStorageState({
    key: LocalStorageKey,
    defaultValue: []
  }), totalPrice = items.reduce(
    (acc, item) => acc + item.basePrice * item.quantity,
    0
  ), clearCart = React2.useCallback(() => {
    (0, import_notifications.cleanNotifications)(), setItems([]), (0, import_notifications.showNotification)({
      title: "Successfully cleared",
      message: "All items in the cart are cleared",
      icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
        className: "h-7 w-7"
      }, void 0, !1, {
        fileName: "app/context/CartContext.tsx",
        lineNumber: 41,
        columnNumber: 10
      }, this),
      color: "green"
    });
  }, [setItems]), addItemToCart = React2.useCallback(
    (item) => {
      let isAlreadyInCart = items.some((i) => i.id === item.id);
      if ((0, import_notifications.cleanNotifications)(), !isAlreadyInCart)
        return setItems((prev) => [
          ...prev,
          {
            ...item,
            quantity: item.quantity
          }
        ]), (0, import_notifications.showNotification)({
          title: "Successfully added",
          message: `Added ${item.name} to cart`,
          color: "green",
          icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
            className: "h-9 w-9"
          }, void 0, !1, {
            fileName: "app/context/CartContext.tsx",
            lineNumber: 65,
            columnNumber: 12
          }, this)
        });
      setItems((prevItems) => {
        let newItems = [...prevItems], index = newItems.findIndex((i) => i.id === item.id);
        return index > -1 && (newItems[index].quantity = newItems[index].quantity + item.quantity), newItems;
      }), (0, import_notifications.showNotification)({
        title: "Item already present in cart",
        message: `Quantity increased by ${item.quantity}`,
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.CheckCircleIcon, {
          className: "h-7 w-7"
        }, void 0, !1, {
          fileName: "app/context/CartContext.tsx",
          lineNumber: 83,
          columnNumber: 11
        }, this),
        color: "green"
      });
    },
    [items, setItems]
  ), removeItemFromCart = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId)), (0, import_notifications.showNotification)({
      title: "Successfully removed",
      message: "Item removed from cart",
      icon: /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(import_solid.MinusCircleIcon, {
        className: "h-7 w-7"
      }, void 0, !1, {
        fileName: "app/context/CartContext.tsx",
        lineNumber: 96,
        columnNumber: 10
      }, this),
      color: "red"
    });
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(CartContext.Provider, {
    value: {
      itemsInCart: items,
      totalPrice,
      addItemToCart,
      removeItemFromCart,
      clearCart
    },
    children
  }, void 0, !1, {
    fileName: "app/context/CartContext.tsx",
    lineNumber: 102,
    columnNumber: 3
  }, this);
}
function useCart() {
  let context = React2.useContext(CartContext);
  if (!context)
    throw new Error("`useCart()` must be used within a <CartProvider />");
  return context;
}

// app/lib/session.server.ts
var import_client3 = require("@prisma/client"), import_node2 = require("@remix-run/node"), import_tiny_invariant = __toESM(require("tiny-invariant"));

// app/lib/user.server.ts
var import_client2 = require("@prisma/client"), bcrypt2 = __toESM(require("bcryptjs"));

// app/lib/prisma.server.ts
var import_client = require("@prisma/client"), prisma;
global.__db__ || (global.__db__ = new import_client.PrismaClient()), prisma = global.__db__, prisma.$connect();

// app/utils/misc.server.ts
var import_node = require("@remix-run/node");
var bcrypt = __toESM(require("bcryptjs")), DEFAULT_REDIRECT = "/", badRequest = (data) => (0, import_node.json)(data, { status: 400 });
function validateEmail(email2) {
  return typeof email2 == "string" && email2.length > 3 && email2.includes("@");
}
function validateName(name2) {
  return typeof name2 == "string" && name2.length > 1;
}
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function createPasswordHash(password2) {
  return bcrypt.hash(password2, 10);
}

// app/lib/user.server.ts
async function getUserById(id) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: !0,
      name: !0,
      email: !0,
      address: !0
    }
  });
}
async function getUserByEmail(email2) {
  return prisma.user.findUnique({
    where: { email: email2 },
    select: {
      name: !0,
      email: !0
    }
  });
}
async function createUser({
  email: email2,
  password: password2,
  name: name2,
  role = import_client2.Role.CUSTOMER,
  address
}) {
  return prisma.user.create({
    data: {
      name: name2,
      email: email2,
      password: await createPasswordHash(password2),
      role,
      address
    }
  });
}
async function verifyLogin(email2, password2) {
  let userWithPassword = await prisma.user.findUnique({
    where: { email: email2 }
  });
  if (!userWithPassword || !userWithPassword.password || !await bcrypt2.compare(password2, userWithPassword.password))
    return null;
  let { password: _password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
}

// app/lib/session.server.ts
(0, import_tiny_invariant.default)(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = (0, import_node2.createCookieSessionStorage)({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId", USER_ROLE_KEY = "userRole", fourteenDaysInSeconds = 60 * 60 * 24 * 14, thirtyDaysInSeconds = 60 * 60 * 24 * 30;
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw (0, import_node2.redirect)(`/login?${searchParams}`);
  }
  return userId;
}
async function requireUser(request, redirectTo = new URL(request.url).pathname) {
  let userId = await requireUserId(request, redirectTo), user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function createUserSession({
  request,
  userId,
  role,
  remember = !1,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), session.set(USER_ROLE_KEY, role), (0, import_node2.redirect)(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? fourteenDaysInSeconds : thirtyDaysInSeconds
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return session.unset(USER_SESSION_KEY), (0, import_node2.redirect)("/login", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}
async function isCustomer(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === import_client3.Role.CUSTOMER;
}
async function isAdmin(request) {
  return (await getSession(request)).get(USER_ROLE_KEY) === import_client3.Role.ADMIN;
}

// app/styles/app.css
var app_default = "/build/_assets/app-N6NKGXYO.css";

// app/root.tsx
var import_jsx_dev_runtime3 = require("react/jsx-dev-runtime"), appendCache = (0, import_core.createEmotionCache)({ key: "mantine", prepend: !1 }), links = () => [{ rel: "stylesheet", href: app_default }], loader = async ({ request }) => {
  let user = await getUser(request);
  return (0, import_node3.json)({ user });
}, meta = () => ({
  charset: "utf-8",
  title: app_config_default.name,
  viewport: "width=device-width,initial-scale=1"
});
function Document({
  title,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_core.MantineProvider, {
    withNormalizeCSS: !0,
    emotionCache: appendCache,
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", {
      lang: "en",
      className: "h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", {
          children: [
            title ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("title", {
              children: title
            }, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 54,
              columnNumber: 15
            }, this) : null,
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Meta, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 55,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Links, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 56,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_remix2.StylesPlaceholder, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 57,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 53,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", {
          className: "h-full",
          children: [
            children,
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.ScrollRestoration, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 61,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Scripts, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 62,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.LiveReload, {}, void 0, !1, {
              fileName: "app/root.tsx",
              lineNumber: 63,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 59,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 3
  }, this);
}
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_modals.ModalsProvider, {
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_notifications2.NotificationsProvider, {
        autoClose: 2e3,
        limit: 3,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(CartProvider, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(import_react3.Outlet, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 76,
            columnNumber: 7
          }, this)
        }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 75,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 72,
    columnNumber: 3
  }, this);
}

// app/routes/api/queues/update-order-status.ts
var update_order_status_exports = {};
__export(update_order_status_exports, {
  action: () => action
});

// app/lib/order.server.ts
var import_client4 = require("@prisma/client");
var import_remix3 = require("quirrel/remix");
function getAllOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: !0,
      payment: !0,
      products: {
        include: {
          product: !0
        }
      }
    }
  });
}
function getOrders(userId) {
  return prisma.order.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    },
    include: {
      products: {
        include: {
          product: !0
        }
      },
      payment: !0
    }
  });
}
function createOrder({
  userId,
  products,
  amount,
  orderType,
  paymentMethod,
  address,
  pickupTime
}) {
  return prisma.$transaction(async (tx) => {
    let order = await tx.order.create({
      data: {
        userId,
        type: orderType,
        status: import_client4.OrderStatus.PREPARING,
        pickupTime,
        payment: {
          create: {
            paymentMethod,
            address,
            amount,
            user: {
              connect: {
                id: userId
              }
            }
          }
        }
      }
    });
    return await tx.productOrder.createMany({
      data: products.map((p) => ({
        productId: p.id,
        orderId: order.id,
        quantity: p.quantity,
        amount: p.basePrice * p.quantity
      }))
    }), await Promise.all(
      products.map(async (p) => {
        let product = await tx.product.update({
          where: {
            id: p.id
          },
          data: {
            quantity: {
              decrement: p.quantity
            }
          }
        });
        if (product.quantity < 0)
          throw new Error(`Product ${product.name} has insufficient quantity`);
      })
    ), await updateOrderStatus.enqueue(
      {
        orderId: order.id,
        status: import_client4.OrderStatus.PREPARING
      },
      {
        delay: app_config_default.statusUpdateInterval
      }
    ), order;
  });
}
async function cancelOrder(orderId) {
  let order = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      products: {
        include: {
          product: !0
        }
      }
    }
  });
  if (!order)
    throw new Error("Order not found");
  await prisma.order.update({
    where: {
      id: orderId
    },
    data: {
      status: import_client4.OrderStatus.CANCELLED
    }
  });
  let products = order.products.map((p) => ({
    id: p.product.id,
    quantity: p.quantity,
    baseQuantity: p.product.quantity
  }));
  await Promise.all(
    products.map(
      (p) => prisma.product.update({
        where: {
          id: p.id
        },
        data: {
          quantity: {
            increment: p.quantity
          }
        }
      })
    )
  );
}
var updateOrderStatus = (0, import_remix3.Queue)(
  "/api/queues/update-order-status",
  async ({ orderId, status }) => {
  }
);

// app/routes/api/queues/update-order-status.ts
var action = updateOrderStatus;

// app/routes/api/delete-staff.tsx
var delete_staff_exports = {};
__export(delete_staff_exports, {
  action: () => action2,
  loader: () => loader2
});
var import_node4 = require("@remix-run/node");
var action2 = async ({ request }) => {
  var _a;
  let id = (_a = (await request.formData()).get("id")) == null ? void 0 : _a.toString();
  return id && await prisma.user.delete({ where: { id } }), null;
}, loader2 = async ({ request }) => (0, import_node4.redirect)("/");

// app/routes/api/image-upload.ts
var image_upload_exports = {};
__export(image_upload_exports, {
  action: () => action3
});
var import_node5 = require("@remix-run/node"), action3 = async ({ request }) => {
  let uploadHandler = (0, import_node5.unstable_composeUploadHandlers)(
    (0, import_node5.unstable_createFileUploadHandler)({
      directory: "public/uploads",
      maxPartSize: 5e6
    }),
    (0, import_node5.unstable_createMemoryUploadHandler)()
  ), image = (await (0, import_node5.unstable_parseMultipartFormData)(request, uploadHandler)).get("img");
  return !image || typeof image == "string" ? (0, import_node5.json)({
    error: "something wrong"
  }) : (0, import_node5.json)({
    success: !0,
    imgSrc: `/uploads/${image.name}`
  });
};

// app/routes/api/auth/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action4,
  loader: () => loader3
});
var import_node6 = require("@remix-run/node");
var action4 = async ({ request }) => logout(request), loader3 = async () => (0, import_node6.redirect)("/");

// app/routes/__auth.tsx
var auth_exports = {};
__export(auth_exports, {
  default: () => AuthLayout,
  loader: () => loader4
});
var import_node7 = require("@remix-run/node"), import_react4 = require("@remix-run/react");
var import_jsx_dev_runtime4 = require("react/jsx-dev-runtime"), loader4 = async ({ request }) => await getUser(request) ? (0, import_node7.redirect)("/") : null;
function AuthLayout() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_jsx_dev_runtime4.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
      className: "flex min-h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
          className: "flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
            className: "mx-auto w-full max-w-sm lg:w-96",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(import_react4.Outlet, {}, void 0, !1, {
              fileName: "app/routes/__auth.tsx",
              lineNumber: 19,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__auth.tsx",
            lineNumber: 18,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__auth.tsx",
          lineNumber: 17,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", {
          className: "relative hidden flex-1 lg:block",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("img", {
            className: "absolute inset-0 h-full w-full object-cover",
            src: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?auto=format&fit=crop&w=1470&q=80",
            alt: ""
          }, void 0, !1, {
            fileName: "app/routes/__auth.tsx",
            lineNumber: 24,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__auth.tsx",
          lineNumber: 23,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/__auth.tsx",
      lineNumber: 16,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__auth.tsx",
    lineNumber: 15,
    columnNumber: 3
  }, this);
}

// app/routes/__auth/register.tsx
var register_exports = {};
__export(register_exports, {
  action: () => action5,
  default: () => Register
});
var import_core2 = require("@mantine/core"), import_client5 = require("@prisma/client"), import_react5 = require("@remix-run/react");
var import_jsx_dev_runtime5 = require("react/jsx-dev-runtime"), action5 = async ({ request }) => {
  var _a;
  let formData = await request.formData(), email2 = formData.get("email"), password2 = formData.get("password"), confirmPassword = formData.get("confirmPassword"), name2 = formData.get("name"), address = (_a = formData.get("address")) == null ? void 0 : _a.toString();
  if (!validateName(name2))
    return badRequest({
      fieldErrors: {
        name: "Name is required"
      }
    });
  if (!validateEmail(email2))
    return badRequest({
      fieldErrors: { email: "Email is invalid" }
    });
  if (typeof password2 != "string" || typeof confirmPassword != "string")
    return badRequest({
      fieldErrors: { password: "Password is required" }
    });
  if (password2.length < 8 || confirmPassword.length < 8)
    return badRequest({
      fieldErrors: { password: "Password is too short" }
    });
  if (password2 !== confirmPassword)
    return badRequest({
      fieldErrors: { password: "Passwords do not match" }
    });
  if (await getUserByEmail(email2))
    return badRequest({
      fieldErrors: { email: "A user already exists with this email" }
    });
  let user = await createUser({ email: email2, password: password2, name: name2, address });
  return createUserSession({
    request,
    userId: user.id,
    role: import_client5.Role.CUSTOMER,
    redirectTo: "/"
  });
};
function Register() {
  var _a, _b, _c, _d;
  let transition = (0, import_react5.useTransition)(), actionData = (0, import_react5.useActionData)(), isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_jsx_dev_runtime5.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("h2", {
            className: "mt-6 text-3xl font-extrabold text-gray-900",
            children: "Register"
          }, void 0, !1, {
            fileName: "app/routes/__auth/register.tsx",
            lineNumber: 81,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("p", {
            className: "mt-2 text-sm text-gray-600",
            children: [
              "Have an account already?",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Anchor, {
                component: import_react5.Link,
                to: "/login",
                size: "sm",
                prefetch: "intent",
                children: "Sign in"
              }, void 0, !1, {
                fileName: "app/routes/__auth/register.tsx",
                lineNumber: 84,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/register.tsx",
            lineNumber: 82,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/register.tsx",
        lineNumber: 80,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_react5.Form, {
        replace: !0,
        method: "post",
        className: "mt-8",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("fieldset", {
          disabled: isSubmitting,
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.TextInput, {
              name: "name",
              autoComplete: "given-name",
              label: "Name",
              error: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.name,
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 92,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.TextInput, {
              name: "email",
              type: "email",
              autoComplete: "email",
              label: "Email address",
              error: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.email,
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 100,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.PasswordInput, {
              name: "password",
              label: "Password",
              error: (_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.password,
              autoComplete: "current-password",
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 109,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.PasswordInput, {
              name: "confirmPassword",
              label: "Confirm password",
              error: (_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.password,
              autoComplete: "current-password",
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 117,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Textarea, {
              name: "address",
              label: "Address",
              autoComplete: "street-address"
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 125,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(import_core2.Button, {
              type: "submit",
              loading: isSubmitting,
              fullWidth: !0,
              loaderPosition: "right",
              mt: "1rem",
              children: "Register"
            }, void 0, !1, {
              fileName: "app/routes/__auth/register.tsx",
              lineNumber: 131,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__auth/register.tsx",
          lineNumber: 91,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__auth/register.tsx",
        lineNumber: 90,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__auth/register.tsx",
    lineNumber: 79,
    columnNumber: 3
  }, this);
}

// app/routes/__auth/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action6,
  default: () => Login
});
var import_core3 = require("@mantine/core"), import_react6 = require("@remix-run/react");

// app/lib/zod.schema.ts
var import_zod = require("zod"), name = import_zod.z.string().min(1, "Name is required"), email = import_zod.z.string().email("Invalid email"), password = import_zod.z.string().min(8, "Password must be at least 8 characters"), LoginSchema = import_zod.z.object({
  email,
  password,
  remember: import_zod.z.enum(["on"]).optional(),
  redirectTo: import_zod.z.string().default("/")
}), RegisterUserSchema = import_zod.z.object({
  name,
  email,
  password,
  confirmPassword: password
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["password", "confirmPassword"]
}), ManageProductSchema = import_zod.z.object({
  productId: import_zod.z.string().optional(),
  name: import_zod.z.string().min(1, "Name is required"),
  description: import_zod.z.string().min(1, "Description is required"),
  quantity: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(1, "Quantity must be at least 1")
  ),
  price: import_zod.z.preprocess(
    Number,
    import_zod.z.number().min(0, "Price must be greater than 0")
  ),
  image: import_zod.z.string().min(1, "Image is required"),
  category: import_zod.z.string().min(1, "Category is required").transform((value) => value.split(","))
});

// app/utils/validation.ts
async function validateAction(request, schema) {
  let formData = await request.formData(), fields = Object.fromEntries(formData), result = schema.safeParse(fields);
  return result.success ? {
    fields: result.data,
    fieldErrors: null
  } : {
    fields: null,
    fieldErrors: result.error.issues.reduce(
      (acc, issue) => {
        let key = issue.path[0] ?? issue.code;
        return acc[key] = issue.message, acc;
      },
      {}
    )
  };
}

// app/routes/__auth/login.tsx
var import_jsx_dev_runtime6 = require("react/jsx-dev-runtime"), action6 = async ({ request }) => {
  let { fieldErrors, fields } = await validateAction(request, LoginSchema);
  if (fieldErrors)
    return badRequest({ fieldErrors });
  let { email: email2, password: password2, redirectTo, remember } = fields, user = await verifyLogin(email2, password2);
  return user ? createUserSession({
    request,
    userId: user.id,
    role: user.role,
    remember: remember === "on",
    redirectTo: safeRedirect(redirectTo)
  }) : badRequest({
    fieldErrors: {
      password: "Invalid username or password"
    }
  });
};
function Login() {
  var _a, _b;
  let [searchParams] = (0, import_react6.useSearchParams)(), fetcher = (0, import_react6.useFetcher)(), actionData = fetcher.data, redirectTo = searchParams.get("redirectTo") || "/", isSubmitting = fetcher.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_jsx_dev_runtime6.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", {
            className: "mt-6 text-3xl font-extrabold text-gray-900",
            children: "Sign in"
          }, void 0, !1, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 61,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", {
            className: "mt-2 text-sm text-gray-600",
            children: [
              "Do not have an account yet?",
              " ",
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Anchor, {
                component: import_react6.Link,
                to: "/register",
                size: "sm",
                prefetch: "intent",
                children: "Create account"
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 64,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 62,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/login.tsx",
        lineNumber: 60,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(fetcher.Form, {
        method: "post",
        replace: !0,
        className: "mt-8",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", {
            type: "hidden",
            name: "redirectTo",
            value: redirectTo
          }, void 0, !1, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 71,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("fieldset", {
            disabled: isSubmitting,
            className: "flex flex-col gap-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.TextInput, {
                name: "email",
                type: "email",
                autoComplete: "email",
                label: "Email address",
                error: (_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.email,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 74,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.PasswordInput, {
                name: "password",
                label: "Password",
                error: (_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.password,
                autoComplete: "current-password",
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 83,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Group, {
                position: "apart",
                mt: "1rem",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Switch, {
                  id: "remember-me",
                  name: "rememberMe",
                  label: "Remember me"
                }, void 0, !1, {
                  fileName: "app/routes/__auth/login.tsx",
                  lineNumber: 92,
                  columnNumber: 7
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 91,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_core3.Button, {
                type: "submit",
                loading: isSubmitting,
                fullWidth: !0,
                loaderPosition: "right",
                mt: "1rem",
                children: "Sign in"
              }, void 0, !1, {
                fileName: "app/routes/__auth/login.tsx",
                lineNumber: 104,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__auth/login.tsx",
            lineNumber: 73,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__auth/login.tsx",
        lineNumber: 70,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__auth/login.tsx",
    lineNumber: 59,
    columnNumber: 3
  }, this);
}

// app/routes/__app.tsx
var app_exports = {};
__export(app_exports, {
  default: () => AppLayout,
  loader: () => loader5,
  unstable_shouldReload: () => unstable_shouldReload
});
var import_outline = require("@heroicons/react/24/outline"), import_solid2 = require("@heroicons/react/24/solid"), import_core5 = require("@mantine/core"), import_spotlight = require("@mantine/spotlight"), import_node8 = require("@remix-run/node"), import_react7 = require("@remix-run/react");
var React3 = __toESM(require("react"));

// app/components/Footer.tsx
var import_jsx_dev_runtime7 = require("react/jsx-dev-runtime");
function Footer() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("footer", {
    className: "flex h-[44px] items-center justify-center p-6 py-1 text-center text-sm",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime7.jsxDEV)("span", {
      className: "text-gray-400",
      children: [
        "\xA9",
        new Date().getFullYear(),
        " ",
        app_config_default.name,
        ", Inc. All rights reserved."
      ]
    }, void 0, !0, {
      fileName: "app/components/Footer.tsx",
      lineNumber: 6,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/components/Footer.tsx",
    lineNumber: 5,
    columnNumber: 3
  }, this);
}

// app/components/TailwindContainer.tsx
var import_core4 = require("@mantine/core"), import_jsx_dev_runtime8 = require("react/jsx-dev-runtime");
function TailwindContainer({
  children,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime8.jsxDEV)("div", {
    className: (0, import_core4.clsx)("mx-auto max-w-2xl lg:max-w-7xl", className),
    children
  }, void 0, !1, {
    fileName: "app/components/TailwindContainer.tsx",
    lineNumber: 11,
    columnNumber: 3
  }, this);
}

// app/lib/product.server.ts
function getAllProducts() {
  return prisma.product.findMany({});
}

// app/routes/__app.tsx
var import_jsx_dev_runtime9 = require("react/jsx-dev-runtime"), loader5 = async ({ request }) => {
  if (await isAdmin(request))
    return (0, import_node8.redirect)("/admin");
  let products = await getAllProducts(), categories2 = Array.from(
    new Set(products.map((product) => product.category).flat())
  );
  return (0, import_node8.json)({
    products,
    categories: categories2,
    isCustomer: await isCustomer(request)
  });
};
function AppLayout() {
  let navigate = (0, import_react7.useNavigate)(), { products } = (0, import_react7.useLoaderData)(), [actions2] = React3.useState(() => {
    let actions3 = [];
    return products.forEach((product) => {
      actions3.push({
        title: product.name,
        category: product.category.join(", "),
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Avatar, {
          src: product.image,
          radius: "xl",
          size: "sm"
        }, void 0, !1, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 72,
          columnNumber: 11
        }, this),
        onTrigger: () => navigate(`/product/${product.slug}`)
      });
    }), actions3;
  });
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_spotlight.SpotlightProvider, {
      shortcut: ["mod + K", "/"],
      highlightQuery: !0,
      searchPlaceholder: "Search for products...",
      searchIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.MagnifyingGlassIcon, {
        className: "h-5 w-5"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 86,
        columnNumber: 17
      }, this),
      limit: 5,
      actionsWrapperComponent: ActionsWrapper,
      nothingFoundMessage: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Text, {
        children: "Nothing found"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 89,
        columnNumber: 26
      }, this),
      filter: (query, actions3) => actions3.filter(
        (action11) => action11.title.toLowerCase().includes(query.toLowerCase()) || action11.category.toLowerCase().includes(query.toLowerCase())
      ),
      actions: actions2,
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
        className: "flex h-full flex-col",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(HeaderComponent, {}, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 100,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.ScrollArea, {
            classNames: { root: "flex-1 bg-gray-100" },
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("main", {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react7.Outlet, {}, void 0, !1, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 103,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app.tsx",
              lineNumber: 102,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 101,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(Footer, {}, void 0, !1, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 106,
            columnNumber: 6
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 99,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app.tsx",
      lineNumber: 82,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 81,
    columnNumber: 3
  }, this);
}
function HeaderComponent() {
  let spotlight = (0, import_spotlight.useSpotlight)(), location = (0, import_react7.useLocation)(), { user } = useOptionalUser(), { itemsInCart } = useCart(), { isCustomer: isCustomer2 } = (0, import_react7.useLoaderData)();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_react7.Form, {
        replace: !0,
        action: "/api/auth/logout",
        method: "post",
        id: "logout-form"
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 122,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("header", {
        className: "h-[100px] p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
            className: "flex h-full w-full items-center justify-between",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                className: "flex flex-shrink-0 items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Anchor, {
                  component: import_react7.Link,
                  to: "/",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("img", {
                    className: "h-20 object-cover object-center",
                    src: app_config_default.logo,
                    alt: "Logo"
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app.tsx",
                  lineNumber: 127,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 126,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                className: "flex items-center gap-4",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.ActionIcon, {
                    title: "Search",
                    size: "md",
                    onClick: () => spotlight.openSpotlight(),
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.MagnifyingGlassIcon, {
                      className: "h-5 w-5 text-gray-500"
                    }, void 0, !1, {
                      fileName: "app/routes/__app.tsx",
                      lineNumber: 142,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 137,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Indicator, {
                    label: itemsInCart.length,
                    inline: !0,
                    size: 16,
                    disabled: itemsInCart.length <= 0,
                    color: "red",
                    offset: 7,
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Button, {
                      px: 8,
                      component: import_react7.Link,
                      variant: "subtle",
                      to: "/cart",
                      title: "Cart",
                      color: "gray",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_outline.ShoppingCartIcon, {
                        className: "h-5 w-5 text-gray-500"
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 161,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app.tsx",
                      lineNumber: 153,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 145,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu, {
                    position: "bottom-start",
                    withArrow: !0,
                    transition: "pop-top-right",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Target, {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("button", {
                          children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Avatar, {
                            color: "blue",
                            size: "md",
                            children: user.name.charAt(0)
                          }, void 0, !1, {
                            fileName: "app/routes/__app.tsx",
                            lineNumber: 173,
                            columnNumber: 12
                          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Avatar, {}, void 0, !1, {
                            fileName: "app/routes/__app.tsx",
                            lineNumber: 177,
                            columnNumber: 12
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 171,
                          columnNumber: 10
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Dropdown, {
                        children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                              disabled: !0,
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
                                className: "flex flex-col",
                                children: [
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", {
                                    children: user.name
                                  }, void 0, !1, {
                                    fileName: "app/routes/__app.tsx",
                                    lineNumber: 187,
                                    columnNumber: 14
                                  }, this),
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("p", {
                                    className: "mt-0.5 text-sm",
                                    children: user.email
                                  }, void 0, !1, {
                                    fileName: "app/routes/__app.tsx",
                                    lineNumber: 188,
                                    columnNumber: 14
                                  }, this)
                                ]
                              }, void 0, !0, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 185,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Divider, {}, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 191,
                              columnNumber: 12
                            }, this),
                            isCustomer2 ? /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_outline.ShoppingBagIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 195,
                                columnNumber: 20
                              }, this),
                              component: import_react7.Link,
                              to: "/order-history",
                              children: "Your orders"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 194,
                              columnNumber: 13
                            }, this) : null,
                            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.ArrowLeftOnRectangleIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 203,
                                columnNumber: 19
                              }, this),
                              type: "submit",
                              form: "logout-form",
                              children: "Logout"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 202,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 184,
                          columnNumber: 11
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_jsx_dev_runtime9.Fragment, {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.ArrowRightOnRectangleIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 213,
                                columnNumber: 19
                              }, this),
                              component: import_react7.Link,
                              to: `/login?redirectTo=${encodeURIComponent(
                                location.pathname
                              )}`,
                              children: "Login"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 212,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Menu.Item, {
                              icon: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_solid2.UserPlusIcon, {
                                className: "h-4 w-4"
                              }, void 0, !1, {
                                fileName: "app/routes/__app.tsx",
                                lineNumber: 222,
                                columnNumber: 19
                              }, this),
                              component: import_react7.Link,
                              to: `/register?redirectTo=${encodeURIComponent(
                                location.pathname
                              )}`,
                              children: "Create account"
                            }, void 0, !1, {
                              fileName: "app/routes/__app.tsx",
                              lineNumber: 221,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app.tsx",
                          lineNumber: 211,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app.tsx",
                    lineNumber: 165,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app.tsx",
                lineNumber: 136,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app.tsx",
            lineNumber: 125,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 124,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 123,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 121,
    columnNumber: 3
  }, this);
}
function ActionsWrapper({ children }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)("div", {
    children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Group, {
        position: "right",
        px: 15,
        py: "xs",
        className: "border-t border-gray-300",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime9.jsxDEV)(import_core5.Text, {
          size: "xs",
          color: "dimmed",
          children: [
            "Search powered by ",
            app_config_default.name
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app.tsx",
          lineNumber: 252,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app.tsx",
        lineNumber: 246,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app.tsx",
    lineNumber: 244,
    columnNumber: 3
  }, this);
}
var unstable_shouldReload = ({
  submission,
  prevUrl,
  url
}) => !(!submission && prevUrl.pathname === url.pathname);

// app/routes/__app/order-history.tsx
var order_history_exports = {};
__export(order_history_exports, {
  action: () => action7,
  default: () => OrderHistory,
  loader: () => loader6
});
var import_outline2 = require("@heroicons/react/24/outline"), import_core6 = require("@mantine/core"), import_client6 = require("@prisma/client"), import_node9 = require("@remix-run/node"), import_react8 = require("@remix-run/react"), import_clsx = __toESM(require("clsx")), React4 = __toESM(require("react"));

// app/utils/misc.ts
function titleCase(string) {
  string = string.toLowerCase();
  let wordsArray = string.split(" ");
  for (var i = 0; i < wordsArray.length; i++)
    wordsArray[i] = wordsArray[i].charAt(0).toUpperCase() + wordsArray[i].slice(1);
  return wordsArray.join(" ");
}
function formatList(list) {
  return new Intl.ListFormat("en").format(list);
}
function formatTime(date) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric"
  }).format(new Date(date));
}

// app/routes/__app/order-history.tsx
var import_jsx_dev_runtime10 = require("react/jsx-dev-runtime"), dateFormatter = new Intl.DateTimeFormat("en-US"), loader6 = async ({ request }) => {
  let userId = await requireUserId(request), orders = await getOrders(userId);
  return (0, import_node9.json)({ orders });
}, action7 = async ({ request }) => {
  var _a, _b;
  let userId = await requireUserId(request), formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  if (!userId || !intent)
    return (0, import_node9.json)({ success: !1, message: "Unauthorized" }, { status: 401 });
  switch (intent) {
    case "cancel-order": {
      let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
      return orderId ? cancelOrder(orderId).then(() => (0, import_node9.json)({ success: !0 })).catch((e) => (0, import_node9.json)({ success: !1, message: e.message }, { status: 500 })) : badRequest({ success: !1, message: "Invalid order id" });
    }
    default:
      return (0, import_node9.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};
function OrderHistory() {
  let { orders } = (0, import_react8.useLoaderData)(), [searchParams, setSearchParams] = (0, import_react8.useSearchParams)(), { clearCart } = useCart();
  return React4.useEffect(() => {
    if (searchParams.get("success")) {
      clearCart(), setSearchParams({}, { replace: !0 });
      return;
    }
  }, [clearCart, searchParams, setSearchParams]), /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
      className: "flex flex-col gap-4 p-4",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
        className: "bg-[rgb(129, 135, 80)]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
            className: "py-16 px-4 sm:py-20 sm:px-4",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "max-w-xl",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                    className: "mb-12",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_outline2.ArrowLeftIcon, {
                        className: "h-5 w-5"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 80,
                        columnNumber: 21
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react8.Link,
                      to: "..",
                      pl: 0,
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 79,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h1", {
                    className: "text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl",
                    children: "Order history"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("p", {
                    className: "mt-2 text-sm text-gray-500",
                    children: "Check the status of recent orders."
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 77,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "mt-16",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h2", {
                    className: "sr-only",
                    children: "Recent orders"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 100,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                    className: "flex flex-col gap-20",
                    children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_jsx_dev_runtime10.Fragment, {
                      children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(Order, {
                        order
                      }, order.id, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 106,
                        columnNumber: 13
                      }, this))
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 104,
                      columnNumber: 11
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(EmptyState, {}, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 110,
                      columnNumber: 11
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 102,
                    columnNumber: 9
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 99,
                columnNumber: 8
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 76,
            columnNumber: 7
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/order-history.tsx",
          lineNumber: 75,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 74,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/order-history.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 72,
    columnNumber: 3
  }, this);
}
function Order({ order }) {
  var _a, _b;
  let returnOrderFetcher = (0, import_react8.useFetcher)(), isOrderCancelled = order.status === import_client6.OrderStatus.CANCELLED, isDelivery = order.type === import_client6.OrderType.DELIVERY;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("h3", {
        className: "sr-only",
        children: [
          "Order placed on",
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("time", {
            dateTime: order.createdAt,
            children: order.createdAt
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 132,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 130,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
        className: (0, import_clsx.default)(
          "rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-6 lg:gap-8"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dl", {
            className: "flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600  sm:flex sm:items-center sm:gap-6 sm:space-y-0 sm:divide-y-0 lg:flex-none lg:gap-16",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "flex justify-between sm:block",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dt", {
                    className: "font-semibold text-gray-900",
                    children: "Date placed"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 143,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("time", {
                      dateTime: order.createdAt,
                      children: dateFormatter.format(new Date(order.createdAt))
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 145,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 144,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 142,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "flex justify-between pt-6 text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Order type"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 153,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: titleCase(order.type)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 154,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 152,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "flex justify-between pt-6 text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Payment method"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 159,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dd", {
                    className: "sm:mt-1",
                    children: titleCase(order.payment.paymentMethod.replace(/_/g, " "))
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 160,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 158,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "flex justify-between pt-6  text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Total amount"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 167,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dd", {
                    className: "flex items-center gap-2 sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                      className: "font-semibold",
                      children: [
                        "$",
                        (_a = order.payment) == null ? void 0 : _a.amount
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 169,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 168,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 166,
                columnNumber: 6
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                className: "flex justify-between pt-6  text-gray-900 sm:block sm:pt-0",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dt", {
                    className: "font-semibold",
                    children: "Status"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 175,
                    columnNumber: 7
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("dd", {
                    className: "flex items-center gap-2 sm:mt-1",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Badge, {
                      color: isOrderCancelled ? "blue" : "green",
                      children: titleCase(order.status)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/order-history.tsx",
                      lineNumber: 177,
                      columnNumber: 8
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 176,
                    columnNumber: 7
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 174,
                columnNumber: 6
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 140,
            columnNumber: 5
          }, this),
          order.status === import_client6.OrderStatus.DELIVERED || order.status === import_client6.OrderStatus.READY || order.status === import_client6.OrderStatus.COMPLETED ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Button, {
            color: "red",
            variant: "outline",
            loaderPosition: "right",
            loading: returnOrderFetcher.state !== "idle",
            onClick: () => returnOrderFetcher.submit(
              {
                intent: "cancel-order",
                orderId: order.id
              },
              {
                method: "post",
                replace: !0
              }
            ),
            children: "Cancel Order"
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 187,
            columnNumber: 6
          }, this) : null
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 135,
        columnNumber: 4
      }, this),
      isDelivery ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
            className: "mt-2 flex items-center gap-4 pt-6 text-sm text-gray-900 sm:block sm:pt-0",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                className: "pl-6 font-semibold",
                children: "Delivery address: "
              }, void 0, !1, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 214,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                className: "font-normal",
                children: (_b = order.payment) == null ? void 0 : _b.address
              }, void 0, !1, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 215,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 213,
            columnNumber: 6
          }, this),
          order.status === import_client6.OrderStatus.PREPARING ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
            className: "mt-2 flex items-center gap-4 pt-6 text-sm text-gray-900 sm:block sm:pt-0",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                className: "pl-6 font-semibold",
                children: "Estd time: "
              }, void 0, !1, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 219,
                columnNumber: 8
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                className: "font-normal",
                children: "45min"
              }, void 0, !1, {
                fileName: "app/routes/__app/order-history.tsx",
                lineNumber: 220,
                columnNumber: 8
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 218,
            columnNumber: 7
          }, this) : null
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 212,
        columnNumber: 5
      }, this) : order.status === import_client6.OrderStatus.READY ? /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
        className: "mt-2 flex items-center gap-4 pt-6 text-sm text-gray-900 sm:block sm:pt-0",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
            className: "pl-6 font-semibold",
            children: "Pickup Time: "
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 226,
            columnNumber: 6
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
            className: "font-normal",
            children: formatTime(order.pickupTime)
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 227,
            columnNumber: 6
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 225,
        columnNumber: 5
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("table", {
        className: "mt-4 w-full text-gray-500 sm:mt-6",
        children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("thead", {
            className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                  scope: "col",
                  className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                  children: "Product"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 234,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                  scope: "col",
                  className: "hidden w-1/5 py-3 pr-8 font-normal sm:table-cell",
                  children: "Quantity"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 237,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                  scope: "col",
                  className: "hidden py-3 pr-8 font-normal sm:table-cell",
                  children: "Price"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 243,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("th", {
                  scope: "col",
                  className: "w-0 py-3 text-right font-normal"
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 249,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 233,
              columnNumber: 6
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 232,
            columnNumber: 5
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tbody", {
            className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
            children: order.products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                  className: "py-6 pr-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                    className: "flex items-center",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("img", {
                        src: product.product.image,
                        alt: product.product.name,
                        className: "mr-6 h-16 w-16 rounded object-cover object-center"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 257,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
                        className: "flex flex-col font-medium text-gray-900",
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Anchor, {
                          component: import_react8.Link,
                          to: `/product/${product.product.slug}`,
                          size: "sm",
                          children: product.product.name
                        }, void 0, !1, {
                          fileName: "app/routes/__app/order-history.tsx",
                          lineNumber: 263,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 262,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 256,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 255,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell",
                  children: product.quantity
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 274,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell",
                  children: [
                    "$",
                    product.amount
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 278,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("td", {
                  className: "whitespace-nowrap py-6 text-right font-medium",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_core6.Anchor, {
                    component: import_react8.Link,
                    to: `/product/${product.product.slug}`,
                    size: "sm",
                    children: [
                      "View",
                      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
                        className: "sr-only",
                        children: [
                          ", ",
                          product.product.name
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/__app/order-history.tsx",
                        lineNumber: 289,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/order-history.tsx",
                    lineNumber: 283,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/order-history.tsx",
                  lineNumber: 282,
                  columnNumber: 8
                }, this)
              ]
            }, product.id, !0, {
              fileName: "app/routes/__app/order-history.tsx",
              lineNumber: 254,
              columnNumber: 7
            }, this))
          }, void 0, !1, {
            fileName: "app/routes/__app/order-history.tsx",
            lineNumber: 252,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 231,
        columnNumber: 4
      }, this)
    ]
  }, order.id, !0, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 129,
    columnNumber: 3
  }, this);
}
function EmptyState() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("div", {
    className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)(import_outline2.ShoppingBagIcon, {
        className: "mx-auto h-9 w-9 text-gray-500"
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 303,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime10.jsxDEV)("span", {
        className: "mt-4 block text-sm font-medium text-gray-500",
        children: "No previous orders"
      }, void 0, !1, {
        fileName: "app/routes/__app/order-history.tsx",
        lineNumber: 304,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/order-history.tsx",
    lineNumber: 302,
    columnNumber: 3
  }, this);
}

// app/routes/__app/product.$slug.tsx
var product_slug_exports = {};
__export(product_slug_exports, {
  default: () => Item,
  loader: () => loader7
});
var import_solid3 = require("@heroicons/react/24/solid"), import_core7 = require("@mantine/core"), import_node10 = require("@remix-run/node"), import_react9 = require("@remix-run/react"), React5 = __toESM(require("react"));
var import_jsx_dev_runtime11 = require("react/jsx-dev-runtime"), loader7 = async ({ params }) => {
  let { slug } = params;
  if (!slug)
    throw new Response("No slug provided", { status: 404 });
  return (0, import_node10.json)({ slug });
};
function Item() {
  let { slug } = (0, import_react9.useLoaderData)(), product = useProduct(slug), { addItemToCart } = useCart(), [quantity, setQuantity] = React5.useState(1);
  if (!product)
    return null;
  let isOutOfStock = product.quantity === 0, totalPrice = quantity ? product.price * quantity : product.price;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
      className: "flex flex-col gap-4 p-4",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
        className: "bg-[rgb(129, 135, 80)]",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
          className: "mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-12 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
              className: "sm:mt-10 lg:row-span-2 lg:mt-0 lg:self-center",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                  className: "mb-12",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.Button, {
                    leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_solid3.ArrowLeftIcon, {
                      className: "h-5 w-5"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 44,
                      columnNumber: 20
                    }, this),
                    variant: "white",
                    size: "md",
                    component: import_react9.Link,
                    to: "..",
                    pl: 0,
                    children: "Back"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 42,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                  className: "overflow-hidden rounded-lg shadow",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("img", {
                    src: product.image,
                    alt: product.name,
                    className: "aspect-square w-full object-cover"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 54,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 41,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
              className: "lg:col-start-2 lg:max-w-lg lg:self-end",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                  className: "mt-4",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("h1", {
                    className: "text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl",
                    children: product.name
                  }, void 0, !1, {
                    fileName: "app/routes/__app/product.$slug.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 64,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("section", {
                  "aria-labelledby": "information-heading",
                  className: "mt-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", {
                      className: "text-lg text-gray-900 sm:text-xl",
                      children: [
                        "$",
                        totalPrice
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 71,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                      className: "mt-4 space-y-6",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("p", {
                        className: "text-base text-gray-500",
                        children: product.description
                      }, void 0, !1, {
                        fileName: "app/routes/__app/product.$slug.tsx",
                        lineNumber: 76,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 75,
                      columnNumber: 9
                    }, this),
                    isOutOfStock ? null : /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_jsx_dev_runtime11.Fragment, {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
                          className: "mt-4 space-y-6",
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", {
                              children: "Available Quantity: "
                            }, void 0, !1, {
                              fileName: "app/routes/__app/product.$slug.tsx",
                              lineNumber: 84,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("span", {
                              className: "text-base text-gray-500",
                              children: product.quantity
                            }, void 0, !1, {
                              fileName: "app/routes/__app/product.$slug.tsx",
                              lineNumber: 85,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 83,
                          columnNumber: 11
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.NumberInput, {
                          mt: 12,
                          required: !0,
                          label: "Quantity",
                          value: quantity,
                          max: product.quantity,
                          onChange: (val) => setQuantity(Number(val)),
                          min: 1,
                          defaultValue: 1
                        }, void 0, !1, {
                          fileName: "app/routes/__app/product.$slug.tsx",
                          lineNumber: 90,
                          columnNumber: 11
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/product.$slug.tsx",
                      lineNumber: 82,
                      columnNumber: 10
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/product.$slug.tsx",
                  lineNumber: 70,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 63,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)("div", {
              className: "mt-6 lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime11.jsxDEV)(import_core7.Button, {
                fullWidth: !0,
                mt: "2.5rem",
                disabled: !quantity || isOutOfStock || quantity > product.quantity,
                onClick: () => addItemToCart({
                  ...product,
                  quantity,
                  basePrice: product.price
                }),
                children: isOutOfStock ? "Out of stock" : "Add to cart"
              }, void 0, !1, {
                fileName: "app/routes/__app/product.$slug.tsx",
                lineNumber: 107,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/product.$slug.tsx",
              lineNumber: 106,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/product.$slug.tsx",
          lineNumber: 40,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/product.$slug.tsx",
        lineNumber: 39,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/product.$slug.tsx",
      lineNumber: 38,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/product.$slug.tsx",
    lineNumber: 37,
    columnNumber: 3
  }, this);
}

// app/routes/__app/index.tsx
var app_exports2 = {};
__export(app_exports2, {
  default: () => Dashboard
});
var import_core8 = require("@mantine/core"), import_react10 = require("@remix-run/react"), React6 = __toESM(require("react"));
var import_jsx_dev_runtime12 = require("react/jsx-dev-runtime");
function Dashboard() {
  let { products, categories: categories2 } = useAppData(), [filteredProducts, setFilteredProducts] = React6.useState(products), [selectedCategories, setSelectedCategories] = React6.useState(
    []
  );
  return React6.useEffect(() => {
    if (!selectedCategories || selectedCategories.length === 0) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(
      products.filter(
        (product) => product.category.some((category) => selectedCategories.includes(category))
      )
    );
  }, [products, selectedCategories]), /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
    className: "flex flex-col gap-4 p-4",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
      className: "bg-[rgb(129, 135, 80)]",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(TailwindContainer, {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
          className: "py-16 px-4 sm:py-20 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
              className: "flex items-center justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h2", {
                  className: "text-2xl font-extrabold tracking-tight text-gray-900",
                  children: "Products"
                }, void 0, !1, {
                  fileName: "app/routes/__app/index.tsx",
                  lineNumber: 34,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_core8.MultiSelect, {
                  clearable: !0,
                  value: selectedCategories,
                  onChange: setSelectedCategories,
                  label: "Filter by category",
                  placeholder: "Select category",
                  data: categories2.map((c) => ({
                    label: c,
                    value: c
                  }))
                }, void 0, !1, {
                  fileName: "app/routes/__app/index.tsx",
                  lineNumber: 38,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/index.tsx",
              lineNumber: 33,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
              className: "mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-8",
              children: filteredProducts.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
                className: "mx-auto sm:mx-[unset]",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("div", {
                    className: "h-48 overflow-hidden rounded-md bg-gray-200 shadow lg:h-64",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("img", {
                      src: product.image,
                      alt: product.name,
                      className: "h-full w-full object-cover object-center"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/index.tsx",
                      lineNumber: 56,
                      columnNumber: 12
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 55,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("h3", {
                    className: "mt-4 text-sm text-gray-700",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_core8.Anchor, {
                      to: `/product/${product.slug}`,
                      prefetch: "intent",
                      component: import_react10.Link,
                      children: product.name
                    }, void 0, !1, {
                      fileName: "app/routes/__app/index.tsx",
                      lineNumber: 64,
                      columnNumber: 12
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 63,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)("p", {
                    className: "mt-1 text-sm font-medium text-gray-900",
                    children: [
                      "$",
                      product.price
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 73,
                    columnNumber: 11
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime12.jsxDEV)(import_core8.Button, {
                    to: `/product/${product.slug}`,
                    component: import_react10.Link,
                    variant: "light",
                    fullWidth: !0,
                    mt: "md",
                    children: "View"
                  }, void 0, !1, {
                    fileName: "app/routes/__app/index.tsx",
                    lineNumber: 77,
                    columnNumber: 11
                  }, this)
                ]
              }, product.id, !0, {
                fileName: "app/routes/__app/index.tsx",
                lineNumber: 54,
                columnNumber: 10
              }, this))
            }, void 0, !1, {
              fileName: "app/routes/__app/index.tsx",
              lineNumber: 51,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/index.tsx",
          lineNumber: 32,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/index.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/__app/index.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/index.tsx",
    lineNumber: 29,
    columnNumber: 3
  }, this);
}

// app/routes/__app/cart.tsx
var cart_exports = {};
__export(cart_exports, {
  action: () => action8,
  default: () => Cart
});
var import_solid4 = require("@heroicons/react/24/solid"), import_core9 = require("@mantine/core"), import_dates = require("@mantine/dates"), import_notifications3 = require("@mantine/notifications"), import_client7 = require("@prisma/client"), import_node11 = require("@remix-run/node"), import_react11 = require("@remix-run/react"), React7 = __toESM(require("react")), import_react_input_mask = __toESM(require("react-input-mask"));
var import_jsx_dev_runtime13 = require("react/jsx-dev-runtime");
async function action8({ request }) {
  var _a, _b, _c, _d, _e, _f, _g;
  let formData = await request.formData(), userId = await getUserId(request), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  if (!userId || !intent)
    return (0, import_node11.json)({ success: !1, message: "Unauthorized" }, { status: 401 });
  switch (intent) {
    case "place-order": {
      let stringifiedProducts = (_b = formData.get("products[]")) == null ? void 0 : _b.toString(), amount = (_c = formData.get("amount")) == null ? void 0 : _c.toString(), orderType = (_d = formData.get("orderType")) == null ? void 0 : _d.toString(), paymentMethod = (_e = formData.get("paymentMethod")) == null ? void 0 : _e.toString(), address = (_f = formData.get("address")) == null ? void 0 : _f.toString(), pickupTime = (_g = formData.get("pickupTime")) == null ? void 0 : _g.toString();
      if (console.log("pickupTime: ", pickupTime), !stringifiedProducts || !amount || !paymentMethod || !orderType)
        return badRequest({
          success: !1,
          message: "Invalid request body"
        });
      if (orderType === import_client7.OrderType.DELIVERY && !address)
        return badRequest({
          success: !1,
          message: "Address is required for delivery"
        });
      if (orderType === import_client7.OrderType.PICKUP && !pickupTime)
        return badRequest({
          success: !1,
          message: "Pickup time is required for pickup"
        });
      let products = JSON.parse(stringifiedProducts);
      return await createOrder({
        userId,
        products,
        amount: Number(amount),
        paymentMethod,
        orderType,
        address: address || "",
        pickupTime: pickupTime ? new Date(pickupTime) : null
      }), (0, import_node11.redirect)("/order-history/?success=true");
    }
  }
}
function Cart() {
  let id = React7.useId(), location = (0, import_react11.useLocation)(), fetcher = (0, import_react11.useFetcher)(), { clearCart, itemsInCart, totalPrice } = useCart(), { user } = useOptionalUser(), [orderType, setOrderType] = React7.useState(import_client7.OrderType.PICKUP), [paymentMethod, setPaymentMethod] = React7.useState(
    import_client7.PaymentMethod.CREDIT_CARD
  ), [address, setAddress] = React7.useState((user == null ? void 0 : user.address) ?? ""), [isPaymentModalOpen, setIsPaymentModalOpen] = React7.useState(!1), [cardNumber, setCardNumber] = React7.useState("1234567891234567"), [pickUpTime, setPickUpTime] = React7.useState(
    new Date(new Date().getTime() + 2 * 60 * 60 * 1e3)
  ), [cardExpiry, setCardExpiry] = React7.useState(
    new Date("2026-12-31")
  ), [cardCvv, setCardCvv] = React7.useState("123"), [errors, setErrors] = React7.useState({
    cardNumber: "",
    cardExpiry: "",
    cardCvv: ""
  }), closePaymentModal = () => setIsPaymentModalOpen(!1), showPaymentModal = () => setIsPaymentModalOpen(!0), placeOrder = () => {
    let formData = new FormData();
    setErrors({
      cardNumber: "",
      cardExpiry: "",
      cardCvv: ""
    }), cardNumber.replace(/[_ ]/g, "").length !== 16 && setErrors((prevError) => ({
      ...prevError,
      cardNumber: "Card number must be 16 digits"
    })), cardExpiry || setErrors((prevError) => ({
      ...prevError,
      cardExpiry: "Card expiry is required"
    })), (!cardCvv || cardCvv.length !== 3) && setErrors((prevError) => ({
      ...prevError,
      cardCvv: "Card CVV must be 3 digits"
    })), !Object.values(errors).some((error) => error !== "") && (formData.append("products[]", JSON.stringify(itemsInCart)), formData.append("amount", totalPrice.toString()), formData.append("intent", "place-order"), formData.append("orderType", orderType), formData.append("paymentMethod", paymentMethod), formData.append("address", address), formData.append("pickupTime", pickUpTime ? pickUpTime.toISOString() : ""), fetcher.submit(formData, {
      method: "post",
      replace: !0
    }));
  }, isSubmitting = fetcher.state !== "idle", isDelivery = orderType === import_client7.OrderType.DELIVERY;
  return React7.useEffect(() => {
    if (fetcher.type === "done" && ((0, import_notifications3.cleanNotifications)(), !fetcher.data.success)) {
      (0, import_notifications3.showNotification)({
        title: "Error",
        message: fetcher.data.message,
        icon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid4.MinusCircleIcon, {
          className: "h-7 w-7"
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 193,
          columnNumber: 11
        }, this),
        color: "red"
      });
      return;
    }
  }, [fetcher.data, fetcher.type]), /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
        className: "flex flex-col gap-4 p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
          className: "bg-[rgb(129, 135, 80)]",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(TailwindContainer, {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
              className: "sm:px-4py-16 py-16 px-4 sm:py-20",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                  className: "flex items-center justify-between",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                          className: "mb-12",
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                            leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid4.ArrowLeftIcon, {
                              className: "h-5 w-5"
                            }, void 0, !1, {
                              fileName: "app/routes/__app/cart.tsx",
                              lineNumber: 210,
                              columnNumber: 22
                            }, this),
                            variant: "white",
                            size: "md",
                            component: import_react11.Link,
                            to: "..",
                            pl: 0,
                            children: "Back"
                          }, void 0, !1, {
                            fileName: "app/routes/__app/cart.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 208,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h1", {
                          className: "text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl",
                          children: "Your cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 220,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("p", {
                          className: "mt-2 text-sm text-gray-500",
                          children: "Products in your cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 223,
                          columnNumber: 10
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 207,
                      columnNumber: 9
                    }, this),
                    itemsInCart.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                      className: "space-x-2",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                          variant: "subtle",
                          color: "red",
                          onClick: () => clearCart(),
                          disabled: isSubmitting,
                          children: "Clear cart"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 230,
                          columnNumber: 11
                        }, this),
                        user ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                          variant: "light",
                          loading: isSubmitting,
                          onClick: () => showPaymentModal(),
                          children: "Make payment"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 240,
                          columnNumber: 12
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                          variant: "light",
                          component: import_react11.Link,
                          to: `/login?redirectTo=${encodeURIComponent(
                            location.pathname
                          )}`,
                          children: "Sign in to order"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 248,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 229,
                      columnNumber: 10
                    }, this) : null
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 206,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                  className: "mt-16",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", {
                      className: "sr-only",
                      children: "Current ice-creams in cart"
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 263,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                      className: "flex flex-col gap-12",
                      children: itemsInCart.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(CartItems, {}, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 266,
                        columnNumber: 36
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(EmptyState2, {}, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 266,
                        columnNumber: 52
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 265,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 262,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 205,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/__app/cart.tsx",
            lineNumber: 204,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 203,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 202,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Modal, {
        opened: !!user && isPaymentModalOpen,
        onClose: closePaymentModal,
        title: "Payment",
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
              className: "flex flex-col gap-2",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("h2", {
                className: "text-sm text-gray-600",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("span", {
                    className: "font-semibold",
                    children: "Amount: "
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 285,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("span", {
                    children: [
                      "$",
                      totalPrice
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 286,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 284,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 283,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Select, {
              label: "Order type",
              value: orderType,
              clearable: !1,
              onChange: (e) => setOrderType(e),
              data: Object.values(import_client7.OrderType).map((type) => ({
                label: titleCase(type.replace(/_/g, " ")),
                value: type
              }))
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 290,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Select, {
              label: "Payment method",
              value: paymentMethod,
              clearable: !1,
              onChange: (e) => setPaymentMethod(e),
              data: Object.values(import_client7.PaymentMethod).map((method) => ({
                label: titleCase(method.replace(/_/g, " ")),
                value: method
              }))
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 301,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Input.Wrapper, {
              id,
              label: "Credit card number",
              required: !0,
              error: errors.cardNumber,
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Input, {
                id,
                component: import_react_input_mask.default,
                mask: "9999 9999 9999 9999",
                placeholder: "XXXX XXXX XXXX XXXX",
                alwaysShowMask: !1,
                value: cardNumber,
                onChange: (e) => setCardNumber(e.target.value)
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 318,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 312,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
              className: "flex items-center gap-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Input.Wrapper, {
                  id: id + "cvv",
                  label: "CVV",
                  required: !0,
                  error: errors.cardCvv,
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Input, {
                    id: id + "cvv",
                    name: "cvv",
                    component: import_react_input_mask.default,
                    mask: "999",
                    placeholder: "XXX",
                    alwaysShowMask: !1,
                    value: cardCvv,
                    onChange: (e) => setCardCvv(e.target.value)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 336,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 330,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_dates.DatePicker, {
                  name: "expiryDate",
                  label: "Expiry",
                  inputFormat: "MM/YYYY",
                  clearable: !1,
                  placeholder: "MM/YYYY",
                  labelFormat: "MM/YYYY",
                  required: !0,
                  value: cardExpiry,
                  minDate: new Date(),
                  onChange: (e) => setCardExpiry(e),
                  error: errors.cardExpiry,
                  initialLevel: "year",
                  hideOutsideDates: !0
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 348,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 329,
              columnNumber: 6
            }, this),
            isDelivery ? /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Textarea, {
              label: "Delivery address",
              name: "address",
              value: address,
              onChange: (e) => setAddress(e.target.value),
              required: !0
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 366,
              columnNumber: 7
            }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_dates.TimeInput, {
                label: "Pickup time",
                clearable: !1,
                format: "12",
                value: pickUpTime,
                onChange: setPickUpTime,
                required: !0
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 375,
                columnNumber: 8
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 374,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
              className: "mt-6 flex items-center gap-4 sm:justify-end",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                  variant: "subtle",
                  color: "red",
                  onClick: () => closePaymentModal(),
                  children: "Cancel"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 387,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Button, {
                  variant: "filled",
                  onClick: () => placeOrder(),
                  loading: isSubmitting,
                  loaderPosition: "right",
                  children: "Place order"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 395,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 386,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 282,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 274,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 201,
    columnNumber: 3
  }, this);
}
function CartItems() {
  let { itemsInCart, removeItemFromCart, totalPrice } = useCart();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_jsx_dev_runtime13.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("table", {
      className: "mt-4 w-full text-gray-500 sm:mt-6",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("thead", {
          className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("tr", {
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("th", {
                scope: "col",
                className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                children: "Products"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 418,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("th", {
                scope: "col",
                className: "hidden py-3 pr-8 font-normal sm:table-cell",
                children: "Quantity"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 421,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("th", {
                scope: "col",
                className: "hidden py-3 pr-8 font-normal sm:table-cell",
                children: "Price"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 427,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("th", {
                scope: "col",
                className: "w-0 py-3 text-right font-normal"
              }, void 0, !1, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 434,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/__app/cart.tsx",
            lineNumber: 417,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 416,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("tbody", {
          className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
          children: [
            itemsInCart.map((item) => {
              let itemTotalPrice = item.basePrice * item.quantity;
              return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("tr", {
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                    className: "py-6 pr-8",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                      className: "flex items-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("img", {
                          src: item.image,
                          alt: item.name,
                          className: "mr-6 h-16 w-16 rounded object-cover object-center"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 446,
                          columnNumber: 11
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                            className: "flex flex-col font-medium text-gray-900",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.Anchor, {
                              component: import_react11.Link,
                              to: `/product/${item.slug}`,
                              size: "sm",
                              children: item.name
                            }, void 0, !1, {
                              fileName: "app/routes/__app/cart.tsx",
                              lineNumber: 453,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/__app/cart.tsx",
                            lineNumber: 452,
                            columnNumber: 12
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 451,
                          columnNumber: 11
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 445,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 444,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                    className: "hidden py-6 pr-8 sm:table-cell",
                    children: item.quantity
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 465,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                    className: "hidden py-6 pr-8 font-semibold sm:table-cell",
                    children: [
                      "$",
                      itemTotalPrice.toFixed(2)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 468,
                    columnNumber: 9
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                    className: "whitespace-nowrap py-6 text-right font-medium",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_core9.ActionIcon, {
                      onClick: () => removeItemFromCart(item.id),
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid4.TrashIcon, {
                        className: "h-4 w-4 text-red-500"
                      }, void 0, !1, {
                        fileName: "app/routes/__app/cart.tsx",
                        lineNumber: 473,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 472,
                      columnNumber: 10
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 471,
                    columnNumber: 9
                  }, this)
                ]
              }, item.id, !0, {
                fileName: "app/routes/__app/cart.tsx",
                lineNumber: 443,
                columnNumber: 8
              }, this);
            }),
            /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("tr", {
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                  className: "py-6 pr-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                    className: "flex items-center",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                          className: "font-medium text-gray-900"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 484,
                          columnNumber: 10
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
                          className: "mt-1 sm:hidden"
                        }, void 0, !1, {
                          fileName: "app/routes/__app/cart.tsx",
                          lineNumber: 485,
                          columnNumber: 10
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/__app/cart.tsx",
                      lineNumber: 483,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 482,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 481,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 sm:table-cell"
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 490,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("td", {
                  className: "hidden py-6 pr-8 font-semibold sm:table-cell",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("span", {
                    children: [
                      "$",
                      totalPrice.toFixed(2)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/__app/cart.tsx",
                    lineNumber: 492,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/__app/cart.tsx",
                  lineNumber: 491,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/__app/cart.tsx",
              lineNumber: 480,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/__app/cart.tsx",
          lineNumber: 438,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/__app/cart.tsx",
      lineNumber: 415,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 414,
    columnNumber: 3
  }, this);
}
function EmptyState2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("div", {
    className: "relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)(import_solid4.ShoppingCartIcon, {
        className: "mx-auto h-9 w-9 text-gray-500"
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 504,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime13.jsxDEV)("span", {
        className: "mt-4 block text-sm font-medium text-gray-500",
        children: "Your cart is empty"
      }, void 0, !1, {
        fileName: "app/routes/__app/cart.tsx",
        lineNumber: 505,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/__app/cart.tsx",
    lineNumber: 503,
    columnNumber: 3
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => AppLayout2,
  loader: () => loader8,
  unstable_shouldReload: () => unstable_shouldReload2
});
var import_solid5 = require("@heroicons/react/24/solid"), import_core10 = require("@mantine/core"), import_node12 = require("@remix-run/node"), import_react12 = require("@remix-run/react");
var import_jsx_dev_runtime14 = require("react/jsx-dev-runtime"), loader8 = async ({ request }) => (await requireUser(request), await isCustomer(request) ? (0, import_node12.redirect)("/") : (0, import_node12.json)({}));
function AppLayout2() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
      className: "flex h-full flex-col",
      children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(HeaderComponent2, {}, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 32,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.ScrollArea, {
          classNames: { root: "flex-1 bg-gray-100" },
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("main", {
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react12.Outlet, {}, void 0, !1, {
              fileName: "app/routes/admin.tsx",
              lineNumber: 35,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 34,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 33,
          columnNumber: 5
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(Footer, {}, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 38,
          columnNumber: 5
        }, this)
      ]
    }, void 0, !0, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 31,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 30,
    columnNumber: 3
  }, this);
}
function HeaderComponent2() {
  let location = (0, import_react12.useLocation)(), { user } = useOptionalUser();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_react12.Form, {
        replace: !0,
        action: "/api/auth/logout",
        method: "post",
        id: "logout-form"
      }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 50,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("header", {
        className: "h-[100px] p-4",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(TailwindContainer, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
            className: "flex h-full w-full items-center justify-between",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex flex-shrink-0 items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Anchor, {
                  component: import_react12.Link,
                  to: "/",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("img", {
                    className: "h-20 object-cover object-center",
                    src: app_config_default.logo,
                    alt: "Logo"
                  }, void 0, !1, {
                    fileName: "app/routes/admin.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 55,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 54,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                className: "flex items-center gap-4",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu, {
                  position: "bottom-start",
                  withArrow: !0,
                  transition: "pop-top-right",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Target, {
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("button", {
                        children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Avatar, {
                          color: "blue",
                          size: "md",
                          children: user.name.charAt(0)
                        }, void 0, !1, {
                          fileName: "app/routes/admin.tsx",
                          lineNumber: 73,
                          columnNumber: 12
                        }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Avatar, {}, void 0, !1, {
                          fileName: "app/routes/admin.tsx",
                          lineNumber: 77,
                          columnNumber: 12
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 71,
                        columnNumber: 10
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin.tsx",
                      lineNumber: 70,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Dropdown, {
                      children: user ? /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Item, {
                            disabled: !0,
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("div", {
                              className: "flex flex-col",
                              children: [
                                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", {
                                  children: user.name
                                }, void 0, !1, {
                                  fileName: "app/routes/admin.tsx",
                                  lineNumber: 87,
                                  columnNumber: 14
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)("p", {
                                  className: "mt-0.5 text-sm",
                                  children: user.email
                                }, void 0, !1, {
                                  fileName: "app/routes/admin.tsx",
                                  lineNumber: 88,
                                  columnNumber: 14
                                }, this)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 86,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 85,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Divider, {}, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 91,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_solid5.ArrowLeftOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 94,
                              columnNumber: 19
                            }, this),
                            type: "submit",
                            form: "logout-form",
                            children: "Logout"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 93,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 84,
                        columnNumber: 11
                      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_jsx_dev_runtime14.Fragment, {
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_solid5.ArrowRightOnRectangleIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 104,
                              columnNumber: 19
                            }, this),
                            component: import_react12.Link,
                            to: `/login?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Login"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 103,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_core10.Menu.Item, {
                            icon: /* @__PURE__ */ (0, import_jsx_dev_runtime14.jsxDEV)(import_solid5.UserPlusIcon, {
                              className: "h-4 w-4"
                            }, void 0, !1, {
                              fileName: "app/routes/admin.tsx",
                              lineNumber: 113,
                              columnNumber: 19
                            }, this),
                            component: import_react12.Link,
                            to: `/register?redirectTo=${encodeURIComponent(
                              location.pathname
                            )}`,
                            children: "Create account"
                          }, void 0, !1, {
                            fileName: "app/routes/admin.tsx",
                            lineNumber: 112,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin.tsx",
                      lineNumber: 82,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin.tsx",
                  lineNumber: 65,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin.tsx",
                lineNumber: 64,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin.tsx",
            lineNumber: 53,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin.tsx",
          lineNumber: 52,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 51,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 49,
    columnNumber: 3
  }, this);
}
var unstable_shouldReload2 = ({
  submission,
  prevUrl,
  url
}) => !(!submission && prevUrl.pathname === url.pathname);

// app/routes/admin/products.tsx
var products_exports = {};
__export(products_exports, {
  action: () => action9,
  default: () => ManageProduct,
  loader: () => loader9
});
var import_solid6 = require("@heroicons/react/24/solid"), import_core11 = require("@mantine/core"), import_hooks7 = require("@mantine/hooks"), import_node13 = require("@remix-run/node"), import_react13 = require("@remix-run/react"), import_bson = require("bson"), React8 = __toESM(require("react")), import_slugify = __toESM(require("slugify"));

// app/utils/constant.ts
var categories = [
  "Vegetables",
  "Fruits",
  "Dairy",
  "Bakery",
  "Meat",
  "Fish",
  "Drinks",
  "Snacks",
  "Frozen",
  "Canned",
  "Household"
];

// app/routes/admin/products.tsx
var import_jsx_dev_runtime15 = require("react/jsx-dev-runtime");
var loader9 = async ({ request }) => {
  await requireUser(request);
  let products = await getAllProducts();
  return (0, import_node13.json)({
    products
  });
}, action9 = async ({ request }) => {
  let { fields, fieldErrors } = await validateAction(
    request,
    ManageProductSchema
  );
  if (fieldErrors)
    return badRequest({ success: !1, fieldErrors });
  let { productId, ...rest } = fields, id = new import_bson.ObjectId();
  return await prisma.product.upsert({
    where: {
      id: productId || id.toString()
    },
    update: {
      ...rest,
      slug: (0, import_slugify.default)(rest.name, { lower: !0 })
    },
    create: {
      ...rest,
      slug: (0, import_slugify.default)(rest.name, { lower: !0 })
    }
  }), (0, import_node13.json)({
    success: !0
  });
};
function ManageProduct() {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
  let fetcher = (0, import_react13.useFetcher)(), imageUploadFetcher = (0, import_react13.useFetcher)(), { products } = (0, import_react13.useLoaderData)(), [selectedProductId, setSelectedProductId] = React8.useState(null), [selectedProduct, setSelectedProduct] = React8.useState(null), [mode, setMode] = React8.useState(0 /* edit */), [isModalOpen, handleModal] = (0, import_hooks7.useDisclosure)(!1), [imageUrl, setImageUrl] = React8.useState(), isSubmitting = fetcher.state !== "idle";
  return React8.useEffect(() => {
    var _a2;
    fetcher.state !== "idle" && fetcher.submission === void 0 || (_a2 = fetcher.data) != null && _a2.success && (setSelectedProductId(null), handleModal.close());
  }, [(_a = fetcher.data) == null ? void 0 : _a.success, fetcher.state, fetcher.submission]), React8.useEffect(() => {
    var _a2, _b2;
    imageUploadFetcher.state !== "idle" && imageUploadFetcher.submission === void 0 || (_a2 = imageUploadFetcher.data) != null && _a2.success && setImageUrl((_b2 = imageUploadFetcher.data) == null ? void 0 : _b2.imgSrc);
  }, [
    (_b = imageUploadFetcher.data) == null ? void 0 : _b.success,
    imageUploadFetcher.state,
    imageUploadFetcher.submission
  ]), React8.useEffect(() => {
    if (!selectedProductId) {
      setSelectedProduct(null);
      return;
    }
    let product = products.find((product2) => product2.id === selectedProductId);
    !product || (setSelectedProduct(product), setImageUrl(product.image), handleModal.open());
  }, [products, selectedProductId]), React8.useEffect(() => {
    mode === 1 /* add */ && (setSelectedProductId(null), setSelectedProduct(null), setImageUrl(void 0));
  }, [mode]), /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_jsx_dev_runtime15.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(TailwindContainer, {
        className: "bg-[rgb(129, 135, 80)] rounded-md",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
          className: "mt-8 px-4 py-10 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "sm:flex sm:flex-auto sm:items-center sm:justify-between",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                      className: "mb-12",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                        leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_solid6.ArrowLeftIcon, {
                          className: "h-5 w-5"
                        }, void 0, !1, {
                          fileName: "app/routes/admin/products.tsx",
                          lineNumber: 164,
                          columnNumber: 20
                        }, this),
                        variant: "white",
                        size: "md",
                        component: import_react13.Link,
                        to: "..",
                        pl: 0,
                        children: "Back"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 162,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("h1", {
                      className: "text-xl font-semibold text-gray-900",
                      children: "Manage Products"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 175,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("p", {
                      className: "mt-2 text-sm text-gray-700",
                      children: "A list of all the products currently present in store."
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 178,
                      columnNumber: 8
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 161,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                    loading: isSubmitting,
                    loaderPosition: "left",
                    onClick: () => {
                      setMode(1 /* add */), handleModal.open();
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_solid6.PlusIcon, {
                        className: "h-4 w-4"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                        className: "ml-2",
                        children: "Add product"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 183,
                    columnNumber: 8
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 182,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 160,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("table", {
                    className: "min-w-full divide-y divide-gray-300",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("thead", {
                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("th", {
                              scope: "col",
                              className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0",
                              children: "Name"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 202,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Price"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 208,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Quantity"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 214,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("th", {
                              scope: "col",
                              className: "hidden py-3.5 px-3 text-left text-sm font-semibold text-gray-900 sm:table-cell",
                              children: "Category"
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 220,
                              columnNumber: 12
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("th", {
                              scope: "col",
                              className: "relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("span", {
                                className: "sr-only",
                                children: "Actions"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/products.tsx",
                                lineNumber: 230,
                                columnNumber: 13
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 226,
                              columnNumber: 12
                            }, this)
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/admin/products.tsx",
                          lineNumber: 201,
                          columnNumber: 11
                        }, this)
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 200,
                        columnNumber: 10
                      }, this),
                      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("tbody", {
                        className: "divide-y divide-gray-200",
                        children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("tr", {
                          children: [
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 md:pl-0",
                              children: product.name
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 237,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: [
                                "$",
                                product.price.toFixed(2)
                              ]
                            }, void 0, !0, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 240,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: product.quantity
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 243,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("td", {
                              className: "whitespace-nowrap py-4 px-3 text-sm text-gray-500",
                              children: formatList(product.category)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 246,
                              columnNumber: 13
                            }, this),
                            /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("td", {
                              className: "relative space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6 md:pr-0",
                              children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                                className: "flex items-center gap-6",
                                children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                                  loading: isSubmitting,
                                  variant: "subtle",
                                  loaderPosition: "right",
                                  onClick: () => {
                                    setSelectedProductId(product.id), setMode(0 /* edit */);
                                  },
                                  children: "Edit"
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/products.tsx",
                                  lineNumber: 252,
                                  columnNumber: 15
                                }, this)
                              }, void 0, !1, {
                                fileName: "app/routes/admin/products.tsx",
                                lineNumber: 251,
                                columnNumber: 14
                              }, this)
                            }, void 0, !1, {
                              fileName: "app/routes/admin/products.tsx",
                              lineNumber: 250,
                              columnNumber: 13
                            }, this)
                          ]
                        }, product.id, !0, {
                          fileName: "app/routes/admin/products.tsx",
                          lineNumber: 236,
                          columnNumber: 12
                        }, this))
                      }, void 0, !1, {
                        fileName: "app/routes/admin/products.tsx",
                        lineNumber: 234,
                        columnNumber: 10
                      }, this)
                    ]
                  }, void 0, !0, {
                    fileName: "app/routes/admin/products.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 198,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/products.tsx",
                lineNumber: 197,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 196,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/products.tsx",
          lineNumber: 159,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/products.tsx",
        lineNumber: 158,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Modal, {
        opened: isModalOpen,
        onClose: () => {
          setSelectedProductId(null), handleModal.close();
        },
        title: (0, import_core11.clsx)({
          "Edit product": mode === 0 /* edit */,
          "Add product": mode === 1 /* add */
        }),
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        closeOnClickOutside: !isSubmitting,
        closeOnEscape: !isSubmitting,
        children: [
          mode === 1 /* add */ ? /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(imageUploadFetcher.Form, {
            method: "post",
            replace: !0,
            encType: "multipart/form-data",
            action: "/api/image-upload",
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
              className: "mb-4 flex items-center gap-2",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("input", {
                  name: "img",
                  type: "file",
                  accept: "image/*",
                  className: "text-grey-500 border text-sm file:mr-5 file:rounded-full file:border-0 file:bg-blue-50 file:py-2	file:px-6 file:text-sm file:font-medium file:text-blue-700 hover:file:cursor-pointer hover:file:bg-amber-50 hover:file:text-amber-700"
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 299,
                  columnNumber: 8
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                  type: "submit",
                  compact: !0,
                  variant: "light",
                  loading: imageUploadFetcher.state !== "idle",
                  children: "Upload image"
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 305,
                  columnNumber: 8
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 298,
              columnNumber: 7
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/admin/products.tsx",
            lineNumber: 292,
            columnNumber: 6
          }, this) : null,
          /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(fetcher.Form, {
            method: "post",
            replace: !0,
            children: /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("fieldset", {
              disabled: isSubmitting,
              className: "flex flex-col gap-4",
              children: [
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("input", {
                  type: "hidden",
                  name: "productId",
                  value: selectedProduct == null ? void 0 : selectedProduct.id
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 319,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.TextInput, {
                  name: "name",
                  label: "Name",
                  defaultValue: selectedProduct == null ? void 0 : selectedProduct.name,
                  error: (_d = (_c = fetcher.data) == null ? void 0 : _c.fieldErrors) == null ? void 0 : _d.name,
                  required: !0
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 321,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Textarea, {
                  name: "description",
                  label: "Description",
                  defaultValue: selectedProduct == null ? void 0 : selectedProduct.description,
                  error: (_f = (_e = fetcher.data) == null ? void 0 : _e.fieldErrors) == null ? void 0 : _f.description,
                  required: !0
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 329,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.NumberInput, {
                  name: "price",
                  label: "Price",
                  min: 0,
                  defaultValue: selectedProduct == null ? void 0 : selectedProduct.price,
                  error: (_h = (_g = fetcher.data) == null ? void 0 : _g.fieldErrors) == null ? void 0 : _h.price,
                  precision: 2,
                  required: !0
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 337,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.NumberInput, {
                  name: "quantity",
                  label: "Quantity",
                  defaultValue: selectedProduct == null ? void 0 : selectedProduct.quantity,
                  min: 1,
                  error: (_j = (_i = fetcher.data) == null ? void 0 : _i.fieldErrors) == null ? void 0 : _j.quantity,
                  required: !0
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 347,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.TextInput, {
                  name: "image",
                  label: "Image",
                  value: imageUrl,
                  onChange: (e) => setImageUrl(e.target.value),
                  error: (_l = (_k = fetcher.data) == null ? void 0 : _k.fieldErrors) == null ? void 0 : _l.image,
                  required: !0
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 356,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.MultiSelect, {
                  name: "category",
                  label: "Category",
                  required: !0,
                  data: categories,
                  defaultValue: selectedProduct == null ? void 0 : selectedProduct.category,
                  placeholder: "Select categories",
                  searchable: !0,
                  error: (_n = (_m = fetcher.data) == null ? void 0 : _m.fieldErrors) == null ? void 0 : _n.category
                }, void 0, !1, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 365,
                  columnNumber: 7
                }, this),
                /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)("div", {
                  className: "mt-1 flex items-center justify-end gap-4",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                      variant: "subtle",
                      type: "button",
                      disabled: isSubmitting,
                      onClick: () => handleModal.close(),
                      color: "red",
                      children: "Cancel"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 377,
                      columnNumber: 8
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime15.jsxDEV)(import_core11.Button, {
                      type: "submit",
                      loading: isSubmitting,
                      loaderPosition: "right",
                      children: mode === 0 /* edit */ ? "Save changes" : "Add product"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/products.tsx",
                      lineNumber: 386,
                      columnNumber: 8
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin/products.tsx",
                  lineNumber: 376,
                  columnNumber: 7
                }, this)
              ]
            }, void 0, !0, {
              fileName: "app/routes/admin/products.tsx",
              lineNumber: 318,
              columnNumber: 6
            }, this)
          }, void 0, !1, {
            fileName: "app/routes/admin/products.tsx",
            lineNumber: 317,
            columnNumber: 5
          }, this)
        ]
      }, void 0, !0, {
        fileName: "app/routes/admin/products.tsx",
        lineNumber: 275,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/products.tsx",
    lineNumber: 157,
    columnNumber: 3
  }, this);
}

// app/routes/admin/orders.tsx
var orders_exports = {};
__export(orders_exports, {
  action: () => action10,
  default: () => Orders,
  loader: () => loader10
});
var import_solid7 = require("@heroicons/react/24/solid"), import_core12 = require("@mantine/core"), import_hooks8 = require("@mantine/hooks"), import_client8 = require("@prisma/client"), import_node14 = require("@remix-run/node"), import_react14 = require("@remix-run/react"), React9 = __toESM(require("react")), import_tiny_invariant2 = __toESM(require("tiny-invariant"));
var import_jsx_dev_runtime16 = require("react/jsx-dev-runtime"), loader10 = async ({ request }) => {
  await requireUser(request);
  let orders = await getAllOrders();
  return (0, import_node14.json)({ orders });
}, action10 = async ({ request }) => {
  var _a, _b, _c;
  let formData = await request.formData(), intent = (_a = formData.get("intent")) == null ? void 0 : _a.toString();
  (0, import_tiny_invariant2.default)(intent, "Invalid intent");
  let orderId = (_b = formData.get("orderId")) == null ? void 0 : _b.toString();
  switch ((0, import_tiny_invariant2.default)(orderId, "Invalid order id"), intent) {
    case "update-order-status": {
      let status = (_c = formData.get("status")) == null ? void 0 : _c.toString();
      return (0, import_tiny_invariant2.default)(status, "Invalid status"), await prisma.order.update({
        where: { id: orderId },
        data: { status }
      }), (0, import_node14.json)({ success: !0 });
    }
    default:
      return (0, import_node14.json)({ success: !1, message: "Invalid intent" }, { status: 400 });
  }
};
function Orders() {
  let { orders } = (0, import_react14.useLoaderData)(), transition = (0, import_react14.useTransition)(), submit = (0, import_react14.useSubmit)(), [products, setProducts] = React9.useState([]), [isOpen, modalHandler] = (0, import_hooks8.useDisclosure)(!1, {
    onClose: () => setProducts([])
  }), isSubmitting = transition.state !== "idle";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_jsx_dev_runtime16.Fragment, {
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(TailwindContainer, {
        className: "mt-16",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
          className: "px-4 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
              className: "sm:flex sm:items-center",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                className: "sm:flex-auto",
                children: [
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                    className: "mb-12",
                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Button, {
                      leftIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_solid7.ArrowLeftIcon, {
                        className: "h-5 w-5"
                      }, void 0, !1, {
                        fileName: "app/routes/admin/orders.tsx",
                        lineNumber: 72,
                        columnNumber: 20
                      }, this),
                      variant: "white",
                      size: "md",
                      component: import_react14.Link,
                      to: "..",
                      pl: 0,
                      children: "Back"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 71,
                      columnNumber: 9
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 70,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("h1", {
                    className: "text-xl font-semibold text-gray-900",
                    children: "Orders"
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 83,
                    columnNumber: 8
                  }, this),
                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("p", {
                    className: "mt-2 text-sm text-gray-700",
                    children: "A list of all the orders in your account including their user details."
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 84,
                    columnNumber: 8
                  }, this)
                ]
              }, void 0, !0, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 69,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/orders.tsx",
              lineNumber: 68,
              columnNumber: 6
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
              className: "mt-8 flex flex-col",
              children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                className: "-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                  className: "inline-block min-w-full py-2 align-middle md:px-6 lg:px-8",
                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                    className: "shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
                    children: orders.length > 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("table", {
                      className: "min-w-full divide-y divide-gray-300",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("thead", {
                          className: "bg-gray-50",
                          children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", {
                            children: [
                              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                                scope: "col",
                                className: "py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6",
                                children: "Name"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 98,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Type"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 104,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Status"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 110,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                                scope: "col",
                                className: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
                                children: "Products"
                              }, void 0, !1, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 116,
                                columnNumber: 14
                              }, this),
                              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                                scope: "col",
                                className: "relative py-3.5 pl-3 pr-4 sm:pr-6",
                                children: [
                                  "Update status",
                                  /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", {
                                    className: "sr-only",
                                    children: "Edit"
                                  }, void 0, !1, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                  }, this)
                                ]
                              }, void 0, !0, {
                                fileName: "app/routes/admin/orders.tsx",
                                lineNumber: 122,
                                columnNumber: 14
                              }, this)
                            ]
                          }, void 0, !0, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 97,
                            columnNumber: 13
                          }, this)
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 96,
                          columnNumber: 12
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tbody", {
                          className: "bg-[rgb(129, 135, 80)] divide-y divide-gray-200",
                          children: orders.map((order) => {
                            var _a;
                            let statusOptions = order.type === import_client8.OrderType.PICKUP ? ["PREPARING", "READY", "COMPLETED"] : ["PREPARING", "DELIVERED"];
                            return /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", {
                              children: [
                                /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                                  className: "whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                    className: "flex items-center",
                                    children: [
                                      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                        className: "h-10 w-10 flex-shrink-0",
                                        children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("img", {
                                          className: "h-10 w-10 rounded-full",
                                          src: order.products[0].product.image,
                                          alt: ""
                                        }, void 0, !1, {
                                          fileName: "app/routes/admin/orders.tsx",
                                          lineNumber: 143,
                                          columnNumber: 19
                                        }, this)
                                      }, void 0, !1, {
                                        fileName: "app/routes/admin/orders.tsx",
                                        lineNumber: 142,
                                        columnNumber: 18
                                      }, this),
                                      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                        className: "ml-4",
                                        children: [
                                          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                            className: "font-medium text-gray-900",
                                            children: order.user.name
                                          }, void 0, !1, {
                                            fileName: "app/routes/admin/orders.tsx",
                                            lineNumber: 150,
                                            columnNumber: 19
                                          }, this),
                                          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                            className: "text-gray-500",
                                            children: order.user.email
                                          }, void 0, !1, {
                                            fileName: "app/routes/admin/orders.tsx",
                                            lineNumber: 153,
                                            columnNumber: 19
                                          }, this)
                                        ]
                                      }, void 0, !0, {
                                        fileName: "app/routes/admin/orders.tsx",
                                        lineNumber: 149,
                                        columnNumber: 18
                                      }, this)
                                    ]
                                  }, void 0, !0, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 141,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 140,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: [
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                      className: "text-gray-900",
                                      children: titleCase(order.type)
                                    }, void 0, !1, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 161,
                                      columnNumber: 17
                                    }, this),
                                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                      className: "text-gray-500",
                                      children: [
                                        "(",
                                        titleCase(
                                          ((_a = order.payment) == null ? void 0 : _a.paymentMethod) ?? ""
                                        ),
                                        ")"
                                      ]
                                    }, void 0, !0, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 164,
                                      columnNumber: 17
                                    }, this)
                                  ]
                                }, void 0, !0, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 160,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Badge, {
                                    color: order.status === import_client8.OrderStatus.PENDING ? "gray" : order.status === import_client8.OrderStatus.CANCELLED ? "red" : "green",
                                    children: titleCase(order.status)
                                  }, void 0, !1, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 173,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 172,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                                  className: "whitespace-nowrap px-3 py-4 text-sm text-gray-500",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Button, {
                                    variant: "subtle",
                                    compact: !0,
                                    onClick: () => {
                                      setProducts(order.products), modalHandler.open();
                                    },
                                    children: "View all"
                                  }, void 0, !1, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 185,
                                  columnNumber: 16
                                }, this),
                                /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                                  className: "relative flex items-center justify-center whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6",
                                  children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                                    className: "flex items-center gap-2",
                                    children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.NativeSelect, {
                                      className: "w-48",
                                      defaultValue: order.status,
                                      data: statusOptions,
                                      disabled: isSubmitting || order.status === import_client8.OrderStatus.DELIVERED || order.status === import_client8.OrderStatus.CANCELLED || order.status === import_client8.OrderStatus.COMPLETED,
                                      onChange: (e) => {
                                        submit(
                                          {
                                            intent: "update-order-status",
                                            orderId: order.id,
                                            status: e.target.value
                                          },
                                          {
                                            method: "post",
                                            replace: !0
                                          }
                                        );
                                      }
                                    }, void 0, !1, {
                                      fileName: "app/routes/admin/orders.tsx",
                                      lineNumber: 199,
                                      columnNumber: 18
                                    }, this)
                                  }, void 0, !1, {
                                    fileName: "app/routes/admin/orders.tsx",
                                    lineNumber: 198,
                                    columnNumber: 17
                                  }, this)
                                }, void 0, !1, {
                                  fileName: "app/routes/admin/orders.tsx",
                                  lineNumber: 197,
                                  columnNumber: 16
                                }, this)
                              ]
                            }, order.id, !0, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 139,
                              columnNumber: 15
                            }, this);
                          })
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 131,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 95,
                      columnNumber: 11
                    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                      className: "bg-[rgb(129, 135, 80)] relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_solid7.ShoppingCartIcon, {
                          className: "mx-auto h-9 w-9 text-gray-500"
                        }, void 0, !1, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 232,
                          columnNumber: 12
                        }, this),
                        /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("span", {
                          className: "mt-4 block text-sm font-medium text-gray-500",
                          children: [
                            "No orders placed yet. ",
                            /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("br", {}, void 0, !1, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 234,
                              columnNumber: 35
                            }, this),
                            "Come back later."
                          ]
                        }, void 0, !0, {
                          fileName: "app/routes/admin/orders.tsx",
                          lineNumber: 233,
                          columnNumber: 12
                        }, this)
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 231,
                      columnNumber: 11
                    }, this)
                  }, void 0, !1, {
                    fileName: "app/routes/admin/orders.tsx",
                    lineNumber: 93,
                    columnNumber: 9
                  }, this)
                }, void 0, !1, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 92,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 91,
                columnNumber: 7
              }, this)
            }, void 0, !1, {
              fileName: "app/routes/admin/orders.tsx",
              lineNumber: 90,
              columnNumber: 6
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/orders.tsx",
          lineNumber: 67,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/orders.tsx",
        lineNumber: 66,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_core12.Modal, {
        opened: isOpen && products.length > 0,
        onClose: () => modalHandler.close(),
        size: "md",
        overflow: "inside",
        title: "Products",
        centered: !0,
        overlayBlur: 1,
        overlayOpacity: 0.7,
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)(import_jsx_dev_runtime16.Fragment, {
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("table", {
            className: "mt-4 w-full text-gray-500 sm:mt-6",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("caption", {
                className: "sr-only",
                children: "Ice-cream"
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 258,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("thead", {
                className: "sr-only text-left text-sm text-gray-500 sm:not-sr-only",
                children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                      scope: "col",
                      className: "py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3",
                      children: "Product"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 261,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                      scope: "col",
                      className: "hidden w-1/5 py-3 pr-8 font-normal sm:table-cell",
                      children: "Quantity"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 267,
                      columnNumber: 9
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("th", {
                      scope: "col",
                      className: "hidden py-3 pr-8 font-normal sm:table-cell",
                      children: "Price"
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 273,
                      columnNumber: 9
                    }, this)
                  ]
                }, void 0, !0, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 260,
                  columnNumber: 8
                }, this)
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 259,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tbody", {
                className: "divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t",
                children: products.map((product) => /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("tr", {
                  children: [
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                      className: "py-6 pr-8",
                      children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                        className: "flex items-center",
                        children: [
                          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("img", {
                            src: product.product.image,
                            alt: product.product.name,
                            className: "mr-6 h-16 w-16 rounded object-cover object-center"
                          }, void 0, !1, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 286,
                            columnNumber: 12
                          }, this),
                          /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                            className: "flex flex-col",
                            children: /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("div", {
                              className: "font-medium text-gray-900",
                              children: product.product.name
                            }, void 0, !1, {
                              fileName: "app/routes/admin/orders.tsx",
                              lineNumber: 292,
                              columnNumber: 13
                            }, this)
                          }, void 0, !1, {
                            fileName: "app/routes/admin/orders.tsx",
                            lineNumber: 291,
                            columnNumber: 12
                          }, this)
                        ]
                      }, void 0, !0, {
                        fileName: "app/routes/admin/orders.tsx",
                        lineNumber: 285,
                        columnNumber: 11
                      }, this)
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 284,
                      columnNumber: 10
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                      className: "hidden py-6 pr-8 sm:table-cell",
                      children: product.quantity
                    }, void 0, !1, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 299,
                      columnNumber: 10
                    }, this),
                    /* @__PURE__ */ (0, import_jsx_dev_runtime16.jsxDEV)("td", {
                      className: "hidden py-6 pr-8 sm:table-cell",
                      children: [
                        "$",
                        product.amount
                      ]
                    }, void 0, !0, {
                      fileName: "app/routes/admin/orders.tsx",
                      lineNumber: 303,
                      columnNumber: 10
                    }, this)
                  ]
                }, product.id, !0, {
                  fileName: "app/routes/admin/orders.tsx",
                  lineNumber: 283,
                  columnNumber: 9
                }, this))
              }, void 0, !1, {
                fileName: "app/routes/admin/orders.tsx",
                lineNumber: 281,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/orders.tsx",
            lineNumber: 257,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/orders.tsx",
          lineNumber: 256,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/orders.tsx",
        lineNumber: 246,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/orders.tsx",
    lineNumber: 65,
    columnNumber: 3
  }, this);
}

// app/routes/admin/index.tsx
var admin_exports2 = {};
__export(admin_exports2, {
  default: () => AdminDashboard
});
var import_core13 = require("@mantine/core"), import_react15 = require("@remix-run/react");
var import_jsx_dev_runtime17 = require("react/jsx-dev-runtime"), actions = [
  {
    title: "Manage Orders",
    description: "View and manage orders",
    href: "orders"
  },
  {
    title: "Manage Products",
    description: "View and manage products",
    href: "products"
  }
];
function AdminDashboard() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
    className: "flex flex-col gap-4 p-4",
    children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
      className: "bg-[rgb(129, 135, 80)]",
      children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(TailwindContainer, {
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
          className: "py-16 px-4 sm:py-20 sm:px-6 lg:px-8",
          children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h2", {
              className: "text-center text-4xl font-semibold tracking-tight text-gray-900",
              children: "Admin Dashboard"
            }, void 0, !1, {
              fileName: "app/routes/admin/index.tsx",
              lineNumber: 24,
              columnNumber: 7
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("ul", {
              className: "mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2",
              children: actions.map((action11, actionIdx) => /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(Card, {
                action: action11
              }, actionIdx, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 30,
                columnNumber: 9
              }, this))
            }, void 0, !1, {
              fileName: "app/routes/admin/index.tsx",
              lineNumber: 28,
              columnNumber: 7
            }, this)
          ]
        }, void 0, !0, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 23,
          columnNumber: 6
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 22,
        columnNumber: 5
      }, this)
    }, void 0, !1, {
      fileName: "app/routes/admin/index.tsx",
      lineNumber: 21,
      columnNumber: 4
    }, this)
  }, void 0, !1, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 20,
    columnNumber: 3
  }, this);
}
function Card({ action: action11 }) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("li", {
    className: "relative col-span-1 divide-y divide-gray-200 rounded-lg border border-gray-300 bg-white shadow",
    children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
        className: "flex w-full items-center justify-between space-x-6 p-6",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
          className: "flex-1 truncate",
          children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("div", {
            className: "flex flex-col items-center gap-3",
            children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("h3", {
                className: "truncate text-xl font-medium text-gray-900",
                children: action11.title
              }, void 0, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 46,
                columnNumber: 7
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_core13.Badge, {
                fullWidth: !1,
                className: "max-w-min",
                children: action11.description
              }, void 0, !1, {
                fileName: "app/routes/admin/index.tsx",
                lineNumber: 50,
                columnNumber: 7
              }, this)
            ]
          }, void 0, !0, {
            fileName: "app/routes/admin/index.tsx",
            lineNumber: 45,
            columnNumber: 6
          }, this)
        }, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 44,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 43,
        columnNumber: 4
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)(import_react15.Link, {
        to: action11.href,
        className: "focus:outline-none",
        children: /* @__PURE__ */ (0, import_jsx_dev_runtime17.jsxDEV)("span", {
          className: "absolute inset-0",
          "aria-hidden": "true"
        }, void 0, !1, {
          fileName: "app/routes/admin/index.tsx",
          lineNumber: 59,
          columnNumber: 5
        }, this)
      }, void 0, !1, {
        fileName: "app/routes/admin/index.tsx",
        lineNumber: 57,
        columnNumber: 4
      }, this)
    ]
  }, void 0, !0, {
    fileName: "app/routes/admin/index.tsx",
    lineNumber: 42,
    columnNumber: 3
  }, this);
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { version: "00eba321", entry: { module: "/build/entry.client-QYKU5UDN.js", imports: ["/build/_shared/chunk-U6DO5IWS.js", "/build/_shared/chunk-DUC2R742.js", "/build/_shared/chunk-KA4DZYDM.js", "/build/_shared/chunk-5KL4PAQL.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-CUKFC6FZ.js", imports: ["/build/_shared/chunk-42R4Q2F4.js", "/build/_shared/chunk-JJKXA73B.js", "/build/_shared/chunk-HGP3UJ4H.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app": { id: "routes/__app", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__app-5QDUPKG2.js", imports: ["/build/_shared/chunk-VRZZG5CT.js", "/build/_shared/chunk-CZW6EQHV.js", "/build/_shared/chunk-SKBI452T.js", "/build/_shared/chunk-XW7VVK4V.js", "/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/cart": { id: "routes/__app/cart", parentId: "routes/__app", path: "cart", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/cart-C2ZTNJB4.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-42R4Q2F4.js", "/build/_shared/chunk-HGP3UJ4H.js", "/build/_shared/chunk-QRXUAIXY.js", "/build/_shared/chunk-NF2EFD3Q.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/index": { id: "routes/__app/index", parentId: "routes/__app", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/__app/index-3FEAUOAL.js", imports: ["/build/_shared/chunk-HGP3UJ4H.js"], hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/order-history": { id: "routes/__app/order-history", parentId: "routes/__app", path: "order-history", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/order-history-HMSGHA66.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-42R4Q2F4.js", "/build/_shared/chunk-HGP3UJ4H.js", "/build/_shared/chunk-QRXUAIXY.js", "/build/_shared/chunk-NF2EFD3Q.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__app/product.$slug": { id: "routes/__app/product.$slug", parentId: "routes/__app", path: "product/:slug", index: void 0, caseSensitive: void 0, module: "/build/routes/__app/product.$slug-WE4QBRBZ.js", imports: ["/build/_shared/chunk-42R4Q2F4.js", "/build/_shared/chunk-HGP3UJ4H.js", "/build/_shared/chunk-QRXUAIXY.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth": { id: "routes/__auth", parentId: "root", path: void 0, index: void 0, caseSensitive: void 0, module: "/build/routes/__auth-BSKLDEJL.js", imports: ["/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/login": { id: "routes/__auth/login", parentId: "routes/__auth", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/login-XIPO7GUS.js", imports: ["/build/_shared/chunk-UX2QLN6H.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/__auth/register": { id: "routes/__auth/register", parentId: "routes/__auth", path: "register", index: void 0, caseSensitive: void 0, module: "/build/routes/__auth/register-5RKGTIKS.js", imports: ["/build/_shared/chunk-UX2QLN6H.js", "/build/_shared/chunk-NF2EFD3Q.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-DOPZ2WWB.js", imports: ["/build/_shared/chunk-CZW6EQHV.js", "/build/_shared/chunk-XW7VVK4V.js", "/build/_shared/chunk-YTKCPPSU.js"], hasAction: !1, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/index": { id: "routes/admin/index", parentId: "routes/admin", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/admin/index-EOIEN4ZH.js", imports: void 0, hasAction: !1, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/orders": { id: "routes/admin/orders", parentId: "routes/admin", path: "orders", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/orders-H7WP33HS.js", imports: ["/build/_shared/chunk-IMHXLUYT.js", "/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js", "/build/_shared/chunk-NF2EFD3Q.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/admin/products": { id: "routes/admin/products", parentId: "routes/admin", path: "products", index: void 0, caseSensitive: void 0, module: "/build/routes/admin/products-FT6AWLUY.js", imports: ["/build/_shared/chunk-4OXK2OY5.js", "/build/_shared/chunk-SKBI452T.js", "/build/_shared/chunk-S7FURB7N.js", "/build/_shared/chunk-QRXUAIXY.js", "/build/_shared/chunk-YJMNGXS3.js"], hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/auth/logout": { id: "routes/api/auth/logout", parentId: "root", path: "api/auth/logout", index: void 0, caseSensitive: void 0, module: "/build/routes/api/auth/logout-YMHSIKRS.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/delete-staff": { id: "routes/api/delete-staff", parentId: "root", path: "api/delete-staff", index: void 0, caseSensitive: void 0, module: "/build/routes/api/delete-staff-3WO62UEK.js", imports: void 0, hasAction: !0, hasLoader: !0, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/image-upload": { id: "routes/api/image-upload", parentId: "root", path: "api/image-upload", index: void 0, caseSensitive: void 0, module: "/build/routes/api/image-upload-NBPAMXJG.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 }, "routes/api/queues/update-order-status": { id: "routes/api/queues/update-order-status", parentId: "root", path: "api/queues/update-order-status", index: void 0, caseSensitive: void 0, module: "/build/routes/api/queues/update-order-status-BQSOWHAT.js", imports: void 0, hasAction: !0, hasLoader: !1, hasCatchBoundary: !1, hasErrorBoundary: !1 } }, url: "/build/manifest-00EBA321.js" };

// server-entry-module:@remix-run/dev/server-build
var assetsBuildDirectory = "public/build", future = { v2_meta: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api/queues/update-order-status": {
    id: "routes/api/queues/update-order-status",
    parentId: "root",
    path: "api/queues/update-order-status",
    index: void 0,
    caseSensitive: void 0,
    module: update_order_status_exports
  },
  "routes/api/delete-staff": {
    id: "routes/api/delete-staff",
    parentId: "root",
    path: "api/delete-staff",
    index: void 0,
    caseSensitive: void 0,
    module: delete_staff_exports
  },
  "routes/api/image-upload": {
    id: "routes/api/image-upload",
    parentId: "root",
    path: "api/image-upload",
    index: void 0,
    caseSensitive: void 0,
    module: image_upload_exports
  },
  "routes/api/auth/logout": {
    id: "routes/api/auth/logout",
    parentId: "root",
    path: "api/auth/logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/__auth": {
    id: "routes/__auth",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: auth_exports
  },
  "routes/__auth/register": {
    id: "routes/__auth/register",
    parentId: "routes/__auth",
    path: "register",
    index: void 0,
    caseSensitive: void 0,
    module: register_exports
  },
  "routes/__auth/login": {
    id: "routes/__auth/login",
    parentId: "routes/__auth",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/__app": {
    id: "routes/__app",
    parentId: "root",
    path: void 0,
    index: void 0,
    caseSensitive: void 0,
    module: app_exports
  },
  "routes/__app/order-history": {
    id: "routes/__app/order-history",
    parentId: "routes/__app",
    path: "order-history",
    index: void 0,
    caseSensitive: void 0,
    module: order_history_exports
  },
  "routes/__app/product.$slug": {
    id: "routes/__app/product.$slug",
    parentId: "routes/__app",
    path: "product/:slug",
    index: void 0,
    caseSensitive: void 0,
    module: product_slug_exports
  },
  "routes/__app/index": {
    id: "routes/__app/index",
    parentId: "routes/__app",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: app_exports2
  },
  "routes/__app/cart": {
    id: "routes/__app/cart",
    parentId: "routes/__app",
    path: "cart",
    index: void 0,
    caseSensitive: void 0,
    module: cart_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/admin/products": {
    id: "routes/admin/products",
    parentId: "routes/admin",
    path: "products",
    index: void 0,
    caseSensitive: void 0,
    module: products_exports
  },
  "routes/admin/orders": {
    id: "routes/admin/orders",
    parentId: "routes/admin",
    path: "orders",
    index: void 0,
    caseSensitive: void 0,
    module: orders_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "routes/admin",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: admin_exports2
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  assetsBuildDirectory,
  entry,
  future,
  publicPath,
  routes
});
//# sourceMappingURL=index.js.map
