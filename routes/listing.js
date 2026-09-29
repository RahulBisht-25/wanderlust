const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapasync.js");
const { isloggedin, isowner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");

// Index + Create
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isloggedin,
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New form (must be before /:id)
router.get("/new", isloggedin, listingController.renderNewForm);

// Show + Update + Delete
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isloggedin,
    isowner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isloggedin,
    isowner,
    wrapAsync(listingController.destroyListing)
  );

// Edit form
router.get(
  "/:id/edit",
  isloggedin,
  isowner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;