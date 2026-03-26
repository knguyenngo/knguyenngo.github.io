import { useState, useEffect } from 'react';

interface ActivityItem {
  type: string;
  repo: string;
  time: string;
}

const EVENT_TAG: Record<string, string> = {
  Push: 'PUSH',
  PullRequest: 'PR',
  Issues: 'ISSUE',
  Create: 'CREATE',
  Fork: 'FORK',
  Watch: 'STAR',
  Delete: 'DELETE',
  IssueComment: 'COMMENT',
  CommitComment: 'COMMENT',
};

export default function ActivityFeed() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/knguyenngo/events/public')
      .then((res) => res.json())
      .then((data) => {
        const recent = data.slice(0, 7).map((event: any) => ({
          type: event.type.replace('Event', ''),
          repo: event.repo.name.split('/')[1],
          time: new Date(event.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          }),
        }));
        setActivity(recent);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div id="activity" className="border-2 border-outline-variant bg-surface-container-highest h-fit">
      {/* Section header */}
      <div className="bg-surface-bright border-b-2 border-outline-variant px-3 py-1 flex items-center justify-between">
        <span className="font-mono text-[11px] font-bold text-secondary tracking-widest uppercase">
          ~/GITHUB/FEED
        </span>
        <span className="font-mono text-[10px] text-on-surface-variant">JOURNALCTL</span>
      </div>

      {/* Feed */}
      <div className="p-3 font-mono text-xs flex flex-col gap-3">
        {loading ? (
          <div className="text-on-surface-variant py-4 text-center">
            <span className="text-primary">$</span> fetching events...
          </div>
        ) : activity.length === 0 ? (
          <div className="text-on-surface-variant py-4 text-center">
            [ NO_EVENTS_FOUND ]
          </div>
        ) : (
          activity.map((item, idx) => (
            <div
              key={idx}
              className="border-l-2 border-outline-variant pl-3 py-0.5 hover:border-primary transition-colors duration-150"
            >
              <div className="text-primary text-[10px] font-bold">
                [{EVENT_TAG[item.type] ?? item.type.toUpperCase()}]
              </div>
              <div className="text-on-surface">{item.repo}</div>
              <div className="text-on-surface-variant text-[10px]">{item.time}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
