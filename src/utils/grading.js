// src/utils/grading.js

// 📝 Questions bank with points per question (UNCHANGED)
export const questionnaires = {
    socialMedia: [
        { id: "sm1", text: "Do you use 2FA on all business accounts?", points: 5 },
        { id: "sm2", text: "Do you use unique strong passwords for each account?", points: 5 },
        { id: "sm3", text: "Do you use a password manager?", points: 5 },
        { id: "sm4", text: "Do you have a backup admin account?", points: 5 },
        { id: "sm5", text: "Do you review login activity regularly?", points: 5 },
        { id: "sm6", text: "Do you limit staff access to only those who need it?", points: 5 },
        { id: "sm7", text: "Do you train staff on phishing awareness?", points: 5 },
        { id: "sm8", text: "Do you remove ex-staff access immediately?", points: 5 },
    ],
    wifi: [
        { id: "wifi1", text: "Is your WiFi password strong & private?", points: 5 },
        { id: "wifi2", text: "Do you change the WiFi password regularly?", points: 5 },
        { id: "wifi3", text: "Do you have a separate guest WiFi?", points: 5 },
        { id: "wifi4", text: "Is your router firmware updated?", points: 5 },
        { id: "wifi5", text: "Is router admin password unique & strong?", points: 5 },
        { id: "wifi6", text: "Is SSID not revealing business info?", points: 5 },
        { id: "wifi7", text: "Is remote router management disabled?", points: 5 },
    ],
    pos: [
        { id: "pos1", text: "Is your POS software updated regularly?", points: 5 },
        { id: "pos2", text: "Is POS device separated from personal devices?", points: 5 },
        { id: "pos3", text: "Do only authorized staff have access?", points: 5 },
        { id: "pos4", text: "Is payment data encrypted by provider?", points: 5 },
        { id: "pos5", text: "Do you check transaction history for anomalies?", points: 5 },
        { id: "pos6", text: "Is your POS device physically secured?", points: 5 },
    ],
    website: [
        { id: "web1", text: "Does your website use HTTPS?", points: 10 },
        { id: "web2", text: "Is the website reachable?", points: 5 },
        { id: "web3", text: "Does it have security headers set?", points: 10 },
    ],
};

// 💡 Recommendations as a structured array with metadata (UNCHANGED)
export const recommendations = [
    { id: "sm1-rec", questionId: "sm1", title: "Enable Two-Factor Authentication (2FA)", description: "This is the most critical step to secure your accounts. Enabling 2FA on social media and all business accounts prevents unauthorized access, even if your password is stolen.", type: "high" },
    { id: "sm2-rec", questionId: "sm2", title: "Create Stronger Social Media Passwords", description: "Weak or reused passwords make your accounts vulnerable. Use a strong, unique password for each social media account to protect against credential stuffing attacks.", type: "high" },
    { id: "sm3-rec", questionId: "sm3", title: "Adopt a Password Manager", description: "Use a dedicated password manager to create, store, and manage complex logins securely without having to remember them all.", type: "medium" },
    { id: "sm4-rec", questionId: "sm4", title: "Create a Backup Admin Account", description: "Establish a backup admin account to regain access in case your main one is compromised or locked out.", type: "low" },
    { id: "sm5-rec", questionId: "sm5", title: "Review Login Activity", description: "Regularly check the login history of your accounts to detect and respond to suspicious activity early.", type: "medium" },
    { id: "sm6-rec", questionId: "sm6", title: "Limit Staff Access", description: "Restrict staff access to business accounts to only those who absolutely need it for their job role.", type: "high" },
    { id: "sm7-rec", questionId: "sm7", title: "Train Staff on Phishing", description: "Provide regular training to your staff to help them recognize and avoid phishing attempts, a leading cause of data breaches.", type: "high" },
    { id: "sm8-rec", questionId: "sm8", title: "Remove Ex-Staff Access", description: "Immediately remove access for ex-employees from all business accounts and systems to prevent unauthorized use.", type: "high" },

    { id: "wifi1-rec", questionId: "wifi1", title: "Change Your Wi-Fi Password", description: "Your Wi-Fi password is too weak. Change it to a strong, unique password with at least 12 characters to prevent unauthorized network access.", type: "high" },
    { id: "wifi2-rec", questionId: "wifi2", title: "Change Wi-Fi Password Regularly", description: "Regularly changing your Wi-Fi password reduces the risk of long-term exposure and unauthorized access.", type: "low" },
    { id: "wifi3-rec", questionId: "wifi3", title: "Set Up a Separate Guest Wi-Fi", description: "Isolate your business systems from guest devices by creating a separate Wi-Fi network for visitors.", type: "medium" },
    { id: "wifi4-rec", questionId: "wifi4", title: "Update Router Firmware", description: "Update your router's firmware frequently to patch security vulnerabilities and improve performance.", type: "medium" },
    { id: "wifi5-rec", questionId: "wifi5", title: "Change Router Admin Password", description: "Change the default administrator password on your router to a strong, unique one to prevent configuration changes by attackers.", type: "high" },
    { id: "wifi6-rec", questionId: "wifi6", title: "Hide Your Wi-Fi Name (SSID)", description: "Consider hiding your Wi-Fi network's name (SSID) to make it less visible to the public.", type: "low" },
    { id: "wifi7-rec", questionId: "wifi7", title: "Disable Remote Router Management", description: "Disable remote management on your router to prevent attackers from accessing its settings from outside your network.", type: "high" },

    { id: "pos1-rec", questionId: "pos1", title: "Update Your POS Software", description: "Your Point of Sale (POS) software is not up-to-date. Regular updates include critical security patches that protect against new threats and vulnerabilities.", type: "high" },
    { id: "pos2-rec", questionId: "pos2", title: "Separate POS Devices", description: "Keep POS devices separate from personal devices to create a more secure and isolated payment environment.", type: "medium" },
    { id: "pos3-rec", questionId: "pos3", title: "Restrict POS Access", description: "Ensure that only authorized staff have access to your POS system to reduce the risk of internal fraud.", type: "high" },
    { id: "pos4-rec", questionId: "pos4", title: "Verify Payment Data Encryption", description: "Confirm with your POS provider that all payment data is encrypted end-to-end, protecting sensitive card information.", type: "high" },
    { id: "pos5-rec", questionId: "pos5", title: "Check for Transaction Anomalies", description: "Regularly check your POS transaction history for any unusual patterns that could indicate fraudulent activity.", type: "low" },
    { id: "pos6-rec", questionId: "pos6", title: "Physically Secure Your POS", description: "Ensure your POS device is physically secured to prevent tampering or theft.", type: "medium" },
    
    { id: "web1-rec", questionId: "web1", title: "Ensure Website Uses HTTPS", description: "Your website does not use HTTPS, which means data transmitted between the user and your site is not encrypted. This is a critical security vulnerability.", type: "high" },
    { id: "web2-rec", questionId: "web2", title: "Monitor Website Uptime", description: "Ensure your website is always online and accessible. Downtime can indicate a security issue or a server problem.", type: "low" },
    { id: "web3-rec", questionId: "web3", title: "Implement Security Headers", description: "Add security headers to your website's response to protect against common attacks like Cross-Site Scripting (XSS) and clickjacking.", type: "high" },
];

// 🔹 Utility: Get status from score (UNCHANGED)
export function getStatus(score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Secure";
    if (score >= 60) return "Moderate";
    if (score >= 40) return "At Risk";
    return "Danger";
}

// 🔹 Calculate total + per-section score + recommendations (HARDENED LOGIC)
export function calculateScore(answers) {
    let overallEarned = 0, overallPossible = 0;
    const sectionScores = {};
    const recs = new Set(); 
    const vulnerabilities = [];
    let answeredQuestionsCount = 0;

    Object.keys(questionnaires).forEach((section) => {
        let sectionEarned = 0;
        let sectionPossible = 0;
        let currentSectionAnswered = 0;

        questionnaires[section].forEach((q) => {
            const ans = answers[q.id];

            if (ans !== undefined) {
                currentSectionAnswered++;
                answeredQuestionsCount++;
                sectionPossible += q.points;

                // Check for a positive answer
                if (ans === true) {
                    sectionEarned += q.points;
                } else {
                    // All other answers ('false' or 'not sure') are now definitively weaknesses/vulnerabilities
                    
                    const rec = recommendations.find(r => r.questionId === q.id);
                    
                    if (rec) {
                        recs.add(rec);
                        
                        // Add the specific vulnerability to the list
                        vulnerabilities.push({
                            id: q.id,
                            section: section,
                            question: q.text,
                            answer: ans, // 'false' or 'not sure'
                            recTitle: rec.title,
                            recDescription: rec.description,
                            severity: rec.type, // 'high', 'medium', or 'low'
                        });
                    }

                    if (ans === "not sure") {
                        // 'not sure' still gets half points for partial security awareness
                        sectionEarned += Math.floor(q.points / 2);
                    }
                    // If ans is false, sectionEarned remains 0 for this question, which is correct.
                }
            }
        });

        // Only add section score to overall if the section was answered
        if (currentSectionAnswered > 0) {
            overallEarned += sectionEarned;
            overallPossible += sectionPossible;
            sectionScores[section] = {
                score: sectionPossible ? Math.round((sectionEarned / sectionPossible) * 100) : 0,
                status: getStatus(sectionPossible ? Math.round((sectionEarned / sectionPossible) * 100) : 0),
            };
        }
    });

    const total = overallPossible ? Math.round((overallEarned / overallPossible) * 100) : 0;
    let finalRecs = Array.from(recs);

    // ✅ FINAL FIX: Only inject the positive message if the score is 100% 
    // AND all questions were answered (optional, but good practice).
    // The UI handles the 'vulnerabilities.length === 0' case internally.
    if (total === 100 && answeredQuestionsCount > 0) {
        // Clear the existing recommendations set just in case, and add the perfect score message
        finalRecs = [{
            id: 'perfect-score',
            title: 'Excellent Security Posture!',
            description: 'Your business demonstrates an excellent security posture. Stay vigilant and on your toes—a proactive defense is your best shield against ever-evolving threats. Keep up the great work!',
            type: 'low'
        }];
    }
   
    return {
        total,
        status: getStatus(total),
        sectionScores,
        recommendations: finalRecs,
        vulnerabilities: vulnerabilities, 
    };
}