import { useState } from "react";
import "./styles.css";

export default function App() {
  const [activity, setActivity] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);

  function addActivity(event) {
    event.preventDefault();

    if (!activity.trim() || !description.trim()) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    const newActivity = {
      activity: activity.trim(),
      timeSpent: Number(timeSpent),
      description: description.trim(),
    };

    setActivities((previous) => [newActivity, ...previous]);

    setActivity("");
    setTimeSpent("");
    setDescription("");
  }

  return (
    <>
      <h1 id="PageTitle">Learning Activities</h1>

      <form id="activityForm" onSubmit={addActivity}>
        <label htmlFor="activity">Activity:</label>
        <input
          type="text"
          id="activity"
          name="activity"
          value={activity}
          onChange={(event) => setActivity(event.target.value)}
          required
        />

        <label htmlFor="timeSpent">Time Spent (minutes):</label>
        <input
          type="number"
          id="timeSpent"
          name="timeSpent"
          min="1"
          step="1"
          value={timeSpent}
          onChange={(event) => setTimeSpent(event.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          required
        />

        <button type="submit">Add Activity</button>
      </form>

      <table id="activities">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Time Spent (minutes)</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {activities.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.activity}</td>
              <td>{entry.timeSpent}</td>
              <td>{entry.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}