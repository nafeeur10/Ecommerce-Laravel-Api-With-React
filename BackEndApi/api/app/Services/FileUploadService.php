<?php

namespace App\Services;

use Illuminate\Support\Facades\URL;

class FileUploadService
{
    private $uploadDirectory = 'products';

    public function setDirectoryPath($directoryFolderName)
    {
        $this->uploadDirectory = $directoryFolderName;
        return $this;
    }

    public function getImageUrl($imageFile)
    {
        $targetImageName = $this->getTargetFileName($imageFile);
        $imageFile->move($this->getUploadDirectory(), $targetImageName);
        return URL::to('/').'/'.$this->getUploadDirectory().'/'.$targetImageName;
    }

    private function getUploadDirectory(): string
    {
        return $this->uploadDirectory;
    }

    private function getTargetFileName($file): string
    {
        return $this->getUniqueHash() . '_' . $file->getClientOriginalName();
    }

    private function getUniqueHash(): string
    {
        return substr(sha1(uniqid()), 0, 6);
    }
}
