'use client';

import { useState } from 'react';

const gcpLinks = [
  {
    label: 'Open GCP Console',
    url: 'https://console.cloud.google.com',
    description: 'Main Google Cloud Platform dashboard',
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    label: 'VM Instances',
    url: 'https://console.cloud.google.com/compute/instances',
    description: 'Compute Engine virtual machines',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    label: 'Cloud Shell',
    url: 'https://shell.cloud.google.com',
    description: 'Browser-based terminal with gcloud CLI',
    color: 'bg-purple-600 hover:bg-purple-700',
  },
];

export default function GCPPanel() {
  const [vmIp, setVmIp] = useState('');

  const sshUrl = vmIp.trim()
    ? `https://ssh.cloud.google.com/v2/ssh/projects?external_ip=${encodeURIComponent(vmIp.trim())}`
    : '';

  return (
    <div className="space-y-6">
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <h3 className="text-sm text-gray-400 tracking-widest font-medium mb-4">
          GCP QUICK ACCESS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {gcpLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white rounded-lg p-5 transition-colors block`}
            >
              <p className="font-medium text-sm">{link.label}</p>
              <p className="text-xs text-white/70 mt-1">{link.description}</p>
              <p className="text-right mt-3 text-lg">&rarr;</p>
            </a>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <h3 className="text-sm text-gray-400 tracking-widest font-medium mb-4">
          SSH VIA BROWSER
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Enter your VM&apos;s external IP address to generate a browser-based SSH link.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={vmIp}
            onChange={(e) => setVmIp(e.target.value)}
            placeholder="e.g. 34.102.136.72"
            className="flex-1 bg-[#0a0a0a] border border-gray-700 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#facc15] transition-colors font-mono"
          />
          {sshUrl && (
            <a
              href={sshUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#facc15] text-black font-medium text-sm px-5 py-2.5 rounded-md hover:bg-[#fbbf24] transition-colors"
            >
              Connect SSH
            </a>
          )}
        </div>
        {sshUrl && (
          <p className="text-xs text-gray-600 mt-2 font-mono break-all">
            {sshUrl}
          </p>
        )}
      </div>
    </div>
  );
}
