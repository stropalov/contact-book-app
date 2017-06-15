/** HTML Template for a modal window with contact data.
  * @constant
  * @type {string}
  */
export const addContactTemplate = `<div class="modal-box">
                                    <div class="modal-box-overlay"></div>
                                    <div class="modal-box-content">
                                      <h1 class="modal-box-title">New Contact</h1>
                                      <form class="modal-box-form">
                                        <div class="control-group">
                                          <label for="name">Name</label>
                                          <input type="text" name="name" required/>
                                        </div>
                                        <div class="control-group">
                                          <label for="phone">Phone Number</label>
                                          <input type="tel" name="phone" required/>
                                        </div>
                                        <div class="control-group">
                                          <label for="phone">E-mail</label>
                                          <input type="email" name="email" />
                                        </div>
                                        <div class="control-group">
                                          <label for="phone">Skype</label>
                                          <input type="text" name="skype" />
                                        </div>
                                        <div class="control-group">
                                          <label for="phone">Facebook</label>
                                          <input type="text" name="facebook" />
                                        </div>
                                        <div class="modal-box-footer">
                                          <button type="button" class="button delete-contact">Delete contact</button>
                                          <button type="button" class="button close-modal">Cancel</button>
                                          <button type="submit" class="button save-contact">Save</button>
                                        </div>
                                      </form>
                                    </div>
                                  </div>`;
