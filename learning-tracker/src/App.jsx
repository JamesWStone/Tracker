import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [activity, setActivity] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [description, setDescription] = useState("");
  const [activities, setActivities] = useState([]);

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");

useEffect(() => {
  const controller = new AbortController();

  async function loadActivities() {
    try {
      const response = await fetch("/api/activities", {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error("Could not load activities.");
      }

      const data = await response.json();
      setActivities(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError("Could not load activities. Check Spring Boot is running.");
      }
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  loadActivities();

  return () => controller.abort();
}, []);

  async function addActivity(event) {
    event.preventDefault();

    if (loading || saving) return;

    if (!activity.trim() || !description.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activity: activity.trim(),
          timeSpent: Number(timeSpent),
          description: description.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not save activity.");
    }

    const savedActivity = await response.json();

    setActivities((previous) => [savedActivity, ...previous]);

    setActivity("");
    setTimeSpent("");
    setDescription("");
  } catch {
    setError("Could not save the activity. Check your inputs and server.");
  } finally {
    setSaving(false);
  }
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

        <button type="submit" disabled={loading || saving}>{saving ? "Saving": "Add Activity"}</button>
      </form>
      {loading && <p>Loading activities</p>}
      {error && <p role="alert">{error}</p>}
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