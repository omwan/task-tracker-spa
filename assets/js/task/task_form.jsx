import React from 'react';

function TaskForm(props) {
    let {task, dispatch, submitFunction} = props;

    function update(data) {
        dispatch({
            type: "UPDATE_TASK_FORM",
            data: data
        });
    }

    if (task === null) {
        return <div>Form loading</div>;
    } else {
        return <form onSubmit={submitFunction}>
            <div className="container form-container">
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="name">Name</label>
                    <input className="form-control  col-md-4"
                           id="name" name="name" type="text"
                           value={task.name}
                           onChange={(event) => update({name: event.target.value})}/>
                </div>
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="description">Description</label>
                    <textarea className="form-control  col-md-4"
                              id="description" name="description"
                              value={task.description}
                              onChange={(event) => update({description: event.target.value})}/>
                </div>
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="complete">Complete</label>
                    <input className="form-control col-md-4"
                           id="complete" name="complete" type="checkbox"
                           value={task.complete}
                           checked={task.complete}
                           onChange={(event) => update({complete: event.target.checked})}/>
                </div>
                <div className="form-group row">
                    <label className="control-label col-form-label col-md-2"
                           htmlFor="time_spent">Time spent</label>
                    <input className="form-control  col-md-4"
                           id="time_spent" name="time_spent" type="number" step="15" min="0"
                           value={task.time_spent}
                           onChange={(event) => update({time_spent: event.target.value})}/>
                </div>
                <div className="form-group row">
                    <button className="btn btn-primary">Save</button>
                </div>
            </div>
        </form>;
    }
}

export default TaskForm;