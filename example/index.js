const { sendMessage } = require("../src/utils/messaging")

sendMessage(
    "DATA_SOURCE",
    {
        key: { recordId: "1" },
        value: { "example": "q" },
        headers: { correlationId: "1", traceId: "1" }
    }
)