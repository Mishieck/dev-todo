export type Event<Name extends string, Payload> = {
  name: Name;
  payload: Payload;
};

export type Observer<Ev extends Event<string, unknown>> = (event: Ev) => void;

export abstract class Observable<EventName extends string, Events extends Record<EventName, unknown>> {
  abstract addObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>
  ): void

  abstract removeObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>
  ): void

  abstract notifyObservers<Ev extends EventName>(
    event: Ev,
    payload: Events[Ev]
  ): void
}
