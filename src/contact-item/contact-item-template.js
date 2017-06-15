import avatar from '../assets/avatar.svg';

/** HTML Template for a single contact item.
  * @constant
  * @type {string}
  */
export const contactItemTemplate = `
                          <div class="contact-avatar-wrapper">
                            <img src="${avatar}" alt="avatar" class="contact-avatar"></img>
                          </div>
                          <div class="contact-info">
                            <div class="contact-name"></div>
                            <div class="contact-phone"></div>
                          </div>`;
