
import { Link, } from "react-router-dom";
export default function CartScreen({ cartItems, setcartItems }) {
  return (
    <>
      <Link className="link mx-2 d-block" to="..">
        Back to result
      </Link>

      <div className="container py-3 px-4">
        <div className="row">
          <div className="col-12 col-md-8 mb-2">
            <div className=" d-flex justify-content-between">
              <h5 className="fw-bold">Shopping Card</h5>
              <span className="text-secondary">Price</span>
            </div>
            <hr className="my-2 mb-4 d-md-block" />



            <div className="row shadow py-3 mb-4">
              <div className="col-3 col-md-2">
                {/* <Link className={"link"} to={`/product/${x._id}`}> */}
                <img
                  src='./image/dog.png'
                  alt="imang not found"
                  width={"100%"}
                  style={{ maxWidth: "150px" }}
                />
                {/* </Link> */}
              </div>
              <div className="col-9 col-md-10 d-flex justify-content-between">
                <div className="w-100">
                  {/* <Link className={"link"} to={`/product/${x._id}`}> */}
                  <h6 className="fw-bold">Pname</h6>
                  {/* </Link> */}
                  <p className="mb-1">Brand: kardf</p>
                  <p className="mb-1">Category: dfdfd</p>
                  <div className="d-flex gap-2 align-items-center">
                    <span>Quantity:</span>
                    <select
                      disabled=""
                      value=""
                      className="bg-gradient bg-light rounded"
                      style={{ minWidth: "70px" }}
                    >
                    </select>
                  </div>
                  <p
                  //   className={
                  //     x.countInStock > 0
                  //       ? "text-success mt-1"
                  //       : "text-danger mt-1"
                  //   }
                  >
                    {/* {x.countInStock > 0 ? "In Stock" : "Out of Stock"} */}
                  </p>
                </div>
                <div>
                  <span
                    className="fw-bold d-block text-end"
                    style={{ color: "#b12704" }}
                  >
                    {/* ${x.price} */}
                  </span>
                  <button
                    className="btn mt-2  btn-warning bg-gradient border-secondary"
                  //   onClick={() => {
                  //     let filter = cartItems.filter(
                  //       (item) => item.product !== x._id
                  //     );
                  //     localStorage.setItem(
                  //       "cartItems",
                  //       JSON.stringify(filter)
                  //     );
                  //     setcartItems(filter);
                  //   }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

          </div>
          <div className="col-12 col-md-4">
            <div className="card-header border-secondary border border-bottom-0">
              <h5 className="fw-bold">Summary</h5>
            </div>
            <div className="card-body border-secondary border">
              <div className="d-flex justify-content-between">
                <h6>Total Products:</h6>
                <span>SummaryDetails</span>
              </div>
              <div className="d-flex justify-content-between">
                <h6>Total Items:</h6>
                <span>88</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <h6>Total Amount:</h6>
                <span>$7757</span>
              </div>
              <div className="d-flex justify-content-between">
                <h6 className="fw-bold">Subtotal:</h6>
                <span className="fw-bold" style={{ color: "#b12704" }}>
                  $7757575
                </span>
              </div>
              <center>
                <button
                  //   onClick={ProcessToCheckout}
                  className="w-100 btn btn-warning border-secondary bg-gradient"
                >
                  Proccess to Chackout
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
