type EventListener = (
  eventType: string,
  action: Record<string, unknown>
) => void;

class EventManager {
  private eventSource: EventSource | null = null;
  private listeners: EventListener[] = [];

  subscribe(listener: EventListener) {
    this.listeners.push(listener);

    if (!this.eventSource) {
      this.eventSource = new EventSource(
        `${import.meta.env.VITE_BACKEND_URL}/events`
      );

      this.eventSource.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        this.notifyListeners(data.event, data.data);
      };

      this.eventSource.onerror = (error) => {
        console.error('EventSource error:', error);
        this.eventSource?.close();
        this.eventSource = null;
      };
    }
  }

  unsubscribe(listener: EventListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  private notifyListeners(eventType: string, action: Record<string, unknown>) {
    this.listeners.forEach((listener) => listener(eventType, action));
  }
}

const eventManager = new EventManager();

export default eventManager;
