import React, { useState, useEffect } from "react";

export default function ReservationShipping({ response }) {
  return (
    <div>
      {response && (
        <div>
          <p>{response.id}</p>
        </div>
      )}
    </div>
  );
}
