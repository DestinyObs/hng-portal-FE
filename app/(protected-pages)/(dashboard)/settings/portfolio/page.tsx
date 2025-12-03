'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useGetProfileData } from '@/hooks/profile-settings';
import { Portfolio } from '@/types/profile-settings';
import Modal from '@/components/shared/ui/modal';
import AddPortfolioForm from './components/add-portfolio-form';
import { useQueryClient } from '@tanstack/react-query';

export default function PortfolioPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(
    null,
  );
  const queryClient = useQueryClient();
  const { data } = useGetProfileData();
  useEffect(() => {
    console.log(data);
  }, [data]);

  // Portfolios from BE
  const portfolios = data?.portfolios || [];

  const handleOpenModal = () => {
    setEditingPortfolio(null);
    setOpenDialog((prev) => !prev);
  };

  const handleEditPortfolio = (portfolio: Portfolio) => {
    setEditingPortfolio(portfolio);
    setOpenDialog(true);
  };

  const handleCloseModal = () => {
    setOpenDialog(false);
    setEditingPortfolio(null);
  };

  const handleSuccess = () => {
    handleCloseModal();
    queryClient.invalidateQueries({
      queryKey: ['profile'],
    });
  };

  return (
    <div className="w-full py-6 justify-center px-4 lg:px-0">
      <div className="w-full mb-6 space-y-1">
        <h3 className="text-2xl font-bold text-[#232323]">Portfolio</h3>
        <p className="font-normal text-base text-black-200">
          Showcase your best work
        </p>
      </div>

      <Card className="flex-1 w-full bg-white-50 border-[#E8E8E8]">
        <CardContent className="px-6 max-w-[1056px]">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-base font-medium text-[#1A1A1A]">Projects</h4>
            <Button
              variant="outline"
              className="w-auto text-[#181818] border-[#E8E8E8] gap-1"
              onClick={handleOpenModal}
            >
              <Plus className="w-3 h-3" /> Add Project
            </Button>
          </div>

          {portfolios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#92959C] text-base">
                No projects yet. Click &quot;Add Project&quot; to get started.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((portfolio) => (
                <div
                  key={portfolio.id}
                  className="border border-[#E8EAEB] rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col"
                >
                  <div className="relative w-full h-48 bg-primary-50">
                    {portfolio.banner_url ? (
                      <Image
                        src={portfolio.banner_url}
                        alt={portfolio.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No Image</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h5 className="font-bold text-[#232323] text-base mb-1">
                      {portfolio.title}
                    </h5>
                    <p className="text-sm text-[#92959C] line-clamp-2 mb-1 flex-1">
                      {portfolio.description || 'No description'}
                    </p>

                    <div className="flex items-center justify-between pt-2 mt-auto border-t border-gray-50">
                      {portfolio.link && (
                        <Link
                          href={portfolio.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary-300 text-base font-medium hover:underline"
                        >
                          View Project
                          <Image
                            src="/assets/dashboard-settings/icons/external-link.png"
                            alt="External Link"
                            width={14}
                            height={14}
                          />
                        </Link>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditPortfolio(portfolio)}
                          className="text-[#00AEFF] text-base font-medium hover:text-primary-300 cursor-pointer"
                        >
                          Edit
                        </button>
                        {/*
                        <button
                          onClick={() => {
                            // TODO: Implement delete functionality
                            console.log('Delete portfolio:', portfolio.id);
                          }}
                          className="text-[#FF3B30] text-base font-medium hover:text-red-700"
                        >
                          Remove
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Modal openDialog={openDialog} setOpenDialog={handleCloseModal}>
        <AddPortfolioForm
          portfolio={editingPortfolio}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}
