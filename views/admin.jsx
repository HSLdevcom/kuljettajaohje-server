import React from "react";

const PATH_PREFIX = '/'

const AdminView = () => {
  const message = "";
  return (
    <>
      <h3>Set UI message</h3>
      <form method="post" action={'/kuljettaja-server/UIMessages'}>
        <fieldset>
          <legend>UI message</legend>
          <p>Set a message that is shown in the UI.</p>
          {message.message && (
            <>
              <h5>Current message:</h5>
              <p>{message.message}</p>
              <p>
                <small>Last set on {message.date}</small>
              </p>
            </>
          )}
          <textarea
            cols={30}
            rows={10}
            style={{ width: '100%' }}
            name="ui_message"
            value={message.message}
            onChange={() => {}}
          />
          <input type="submit" value="Set message" />
        </fieldset>
      </form>
    </>
  )
};

export default AdminView;
