import { ApolloLink, Observable } from 'apollo-link';
import Echo from 'laravel-echo';

export default class EchoLink  extends ApolloLink
{
	subscriptions: any = null
	echo: any = null
	  constructor() {
    super();
    const token = localStorage.getItem('token');
    this.subscriptions = [];
    this.echo = new Echo({
      broadcaster: 'pusher',
      key: '528a43e52a265f4b5f54',
      cluster: 'us2',
      authEndpoint: `http://localhost:8000/graphql/subscriptions/auth`,
      // authEndpoint: `http://localhost:8000/broadcasting/auth`,
      wsHost: location.hostname,
      wsPort: 6001,
      wssPort: 6001,
      disableStats: true,
      enabledTransports: ['ws', 'wss'],
      auth: {
        headers: {
          authorization: token ? `Bearer ${token}` : null,
        },
      },
    });
  }

  request(operation: any, forward: any): any {
    return new Observable(observer => {
      // Check the result of the operation
      forward(operation).subscribe({
        next: (data: any) => {
          // If the operation has the subscription extension, it's a subscription
          const subscriptionChannel = this._getChannel(data, operation);

          if (subscriptionChannel) {
            this._createSubscription(subscriptionChannel, observer);
          } else {
            // No subscription found in the response, pipe data through
            observer.next(data);
            observer.complete();
          }
        },
      });
    });
  }

  _getChannel(data: any, operation: any) {
    return !!data.extensions &&
      !!data.extensions.lighthouse_subscriptions &&
      !!data.extensions.lighthouse_subscriptions.channels
      ? data.extensions.lighthouse_subscriptions.channels[operation.operationName]
      : null;
  }

  _createSubscription(subscriptionChannel: any, observer: any) {
    const privateChannelName = subscriptionChannel.split('private-').pop();

    if (!this.subscriptions.find((s: any) => s.channel === subscriptionChannel)) {
      this.subscriptions.push({
        channel: subscriptionChannel,
        observer: observer,
      });
    }

    this.echo.private(privateChannelName).listen('.lighthouse-subscription', (payload: any) => {
      if (!payload.more || observer._subscription._state === 'closed') {
        this._leaveSubscription(subscriptionChannel, observer);
        return;
      }
      const result = payload.result;
      if (result) {
        observer.next({
          data: result.data,
          extensions: result.extensions,
        });
      }
    });
  }

  _leaveSubscription(channel: any, observer: any) {
    const subscription = this.subscriptions.find((s: any) => s.channel === channel);
    this.echo.leave(channel);
    observer.complete();
    this.subscriptions = this.subscriptions.slice(this.subscriptions.indexOf(subscription), 1);
  }
}