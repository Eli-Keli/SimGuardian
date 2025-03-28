/* eslint-disable @typescript-eslint/no-explicit-any */

interface SendSMSRequest {
    phoneNumber: string;
    message: string;
}

interface SendSMSResponse {
    success: boolean;
    [key: string]: any; // Additional fields if present in the response
}

export const sendSMS = async (phoneNumber: string, message: string): Promise<SendSMSResponse | null> => {
    try {
        const response = await fetch('http://localhost:3000/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber, message } as SendSMSRequest)
        });

        const data: SendSMSResponse = await response.json();
        return data;
    } catch (error) {
        console.error("Error sending SMS:", error);
        return null;
    }
};
