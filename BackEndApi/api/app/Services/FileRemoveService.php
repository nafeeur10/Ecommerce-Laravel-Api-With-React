<?php

namespace App\Services;

use Illuminate\Support\Facades\URL;

class FileRemoveService
{
    public function removeFileFromStorage($fileFullUrl)
    {
        $filePathWithOutRoot = $this->getFilePathWithOutRoot($fileFullUrl);
        if(file_exists($filePathWithOutRoot))
        {
            unlink(public_path($filePathWithOutRoot));
        }
    }

    private function getFilePathWithOutRoot($fileFullUrl)
    {
        $baseUrl = URL::to('/');
        return substr($fileFullUrl, strlen($baseUrl)+1, strlen($fileFullUrl));
    }
}
