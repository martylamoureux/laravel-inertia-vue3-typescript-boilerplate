<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ModulesServiceProvider extends ServiceProvider
{
    private array $modules = [];

    /**
     * Bootstrap services.
     */
    public function boot()
    {
        $this->modules = array_diff(scandir(app_path("Domain")), [".", ".."]);
        $this->loadModulesMigrations();
    }

    private function loadModulesMigrations()
    {
        foreach ($this->modules as $module) {
            $this->loadMigrationsFrom($this->resolvePath(app_path("Domain"), $module, "database", "migrations"));
        }
    }


    protected function resolvePath(string ...$path) {
        return implode(DIRECTORY_SEPARATOR, $path);
    }
}
