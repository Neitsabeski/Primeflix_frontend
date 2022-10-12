<template>
  <div class="contact">
    <div class="catalog py-5">
      <div class="container">
        <div class="row justify-content-start">
          <div class="col-3">
          </div>
          <div class="col-6">
            <div>
              <div>Contact us.
              </div>
              <div>
                <form>
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter name" required>
                  </div>
                  <div class="form-group">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea class="form-control" id="message" rows="6" required></textarea>
                  </div>
                  <div class="mx-auto">
                    <button type="submit" class="btn btn-primary text-right">Submit</button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>