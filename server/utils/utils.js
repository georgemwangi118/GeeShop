const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SEC,
    {
      expiresIn: "30d",
    }
  );
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); //Bearer XXXX
    jwt.verify(token, process.env.JWT_SEC, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

exports.payOrderEmailTemplate = (order) => {
  return `
    <h1>Thanks for shopping with us</h1>
    <p>Hi ${order.user.name},</p>
    <p>We have finished processing your order.</p>
    <h2>
        [Order ${order._id}] (${order.createdAt.toString().substring(0, 10)})
    </h2>
    <table>
        <thead>
            <tr>
                <td><strong>Product</strong></td>
                <td><strong>Quantity</strong></td>
                <td><strong align="right">Price</strong></td>
            </tr>
        </thead>
        <tbody>
            ${order.orderItems
              .map(
                (item) => `
                    <tr>
                        <td>${item.name}</td>
                        <td align="center">${item.quantity}</td>
                        <td align="right">ksh${item.price.toFixed(2)}</td>
                    </tr>
                `
              )
              .join("\n")}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">Items Price:</td>
                <td align="right">ksh${order.itemsPrice.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2">Shipping Price:</td>
                <td align="right">ksh${order.shippingPrice.toFixed(2)}</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Total Price:</strong></td>
                <td align="right"><strong>ksh${order.totalPrice.toFixed(
                  2
                )}</strong></td>
            </tr>
            <tr>
                <td colspan="2">Payment Method:</td>
                <td align="right">${order.paymentMethod}</td>
            </tr>
        </tfoot>
    </table>

    <h2>Shipping address</h2>
    <p>
        ${order.shippingAddress.fullName},<br/>
        ${order.shippingAddress.address},<br/>
        ${order.shippingAddress.city},<br/>
        ${order.shippingAddress.country},<br/>
        ${order.shippingAddress.postalCode}<br/>
    </p>
    <hr/>
    <p>Thanks for shopping with us.</p>
    `;
};
