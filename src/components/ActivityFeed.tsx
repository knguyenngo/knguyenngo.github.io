// src/components/ActivityFeed.tsx
import { useState, useEffect } from 'react';

interface ActivityItem {
  type: string;
  repo: string;
  time: string;
}

export default function ActivityFeed() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/users/knguyenngo/events/public')
      .then(res => res.json())
      .then(data => {
        const recent = data.slice(0, 5).map((event: any) => ({
          type: event.type.replace('Event', ''),
          repo: event.repo.name.split('/')[1],
          time: new Date(event.created_at).toLocaleDateString('en-US', { 
            month: 'short', day: 'numeric' 
          })
        }));
        setActivity(recent);
      })
      .catch(err => console.error('GitHub API error:', err));
  }, []);

  return (
    <div className="sidebarBox activityBox">
      <div className="sidebarTitle">Recent Activity</div>
      <div className="activityList">
        {activity.length > 0 ? (
          activity.map((item, idx) => (
            <div key={idx} className="activityItem">
              <div className="activityType">{item.type}</div>
              <div className="activityRepo">{item.repo}</div>
              <div className="activityTime">{item.time}</div>
            </div>
          ))
        ) : (
          <div className="activityLoading">Loading...</div>
        )}
      </div>
    </div>
  );
}
