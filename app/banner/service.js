import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class BannerService extends Service {
  @tracked message = null;
  @tracked showBanner = false;
  @tracked messageType = 'success';

  show(config = {}) {
    this.messageType = config.type;
    this.message = config.message;
    this.showBanner = true;
    later(() => {
      this.showBanner = false; // Auto hide the banner after 3 secs
    }, 3000);
  }
}
