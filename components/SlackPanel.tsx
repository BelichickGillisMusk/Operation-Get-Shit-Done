'use client';

import { useState } from 'react';

export default function SlackPanel() {
  const [slackUrl, setSlackUrl] = useState('');
  const [iframeError, setIframeError] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg p-5">
        <h3 className="text-sm text-gray-400 tracking-widest font-medium mb-4">
          SLACK CHANNEL EMBED
        </h3>

        <div className="flex gap-3">
          <input
            type="url"
            value={slackUrl}
            onChange={(e) => {
              setSlackUrl(e.target.value);
              setIframeError(false);
            }}
            placeholder="Paste Slack channel URL (e.g., https://app.slack.com/client/T.../C...)"
            className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#facc15] transition-colors"
          />
          <button
            onClick={() => setSlackUrl('')}
            className="text-gray-400 hover:text-white text-sm px-3 py-2 rounded-md border border-gray-700 hover:border-gray-500 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {slackUrl ? (
        <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
          {iframeError ? (
            <div className="flex flex-col items-center justify-center h-96 text-center p-8">
              <p className="text-[#facc15] font-medium text-lg mb-2">
                Iframe Blocked
              </p>
              <p className="text-gray-400 text-sm max-w-md">
                Slack&apos;s Content Security Policy may prevent embedding. Use
                the Slack desktop app or open in a new tab instead.
              </p>
              <a
                href={slackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-[#3b82f6] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-blue-600 transition-colors"
              >
                Open in New Tab
              </a>
            </div>
          ) : (
            <iframe
              src={slackUrl}
              className="w-full h-[calc(100vh-340px)] border-0"
              title="Slack Channel"
              onError={() => setIframeError(true)}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          )}
        </div>
      ) : (
        <div className="bg-[#1a1a1a] rounded-lg flex flex-col items-center justify-center h-96 text-center p-8">
          <p className="text-gray-500 text-lg font-medium">No Channel Loaded</p>
          <p className="text-gray-600 text-sm mt-2">
            Paste a Slack channel URL above to embed it here.
          </p>
          <p className="text-gray-700 text-xs mt-4">
            Note: Slack may block iframe embedding due to CSP headers. If the
            embed doesn&apos;t load, use the Slack desktop app.
          </p>
        </div>
      )}
    </div>
  );
}
